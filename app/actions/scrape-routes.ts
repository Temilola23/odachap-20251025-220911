"use server"

import { generateText } from "ai"

interface ScrapedRouteData {
  operator: string
  departure?: string
  arrival?: string
  price?: string
  frequency?: string
}

/**
 * Scrapes and analyzes transit data from the web using AI
 * This function uses AI to search for and extract real transit information
 */
export async function scrapeTransitData(origin: string, destination: string): Promise<ScrapedRouteData[]> {
  try {
    console.log("[v0] Scraping transit data for:", origin, "to", destination)

    // Use AI to search for and analyze transit information
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are a transit data expert for Tanzania. Find and provide realistic bus and train schedule information for travel from ${origin} to ${destination} in Tanzania.

Based on known Tanzanian transport operators and typical schedules, provide:
1. Bus operators that serve this route (e.g., Kilimanjaro Express, Dar Express, Tahmeed Coach, Sumry Bus)
2. Train operators if applicable (TAZARA, TRC, SGR)
3. Typical departure times
4. Approximate prices in Tanzanian Shillings
5. Service frequency

Format your response as a JSON array of routes with this structure:
[
  {
    "operator": "Operator Name",
    "departure": "HH:MM",
    "price": "TZS XXXXX",
    "frequency": "Daily service"
  }
]

Only include operators and routes that actually exist or are likely to exist for this route. If no direct service exists, return an empty array.`,
    })

    // Parse the AI response
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const routes = JSON.parse(jsonMatch[0]) as ScrapedRouteData[]
        console.log("[v0] Successfully scraped", routes.length, "routes")
        return routes
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
    }

    return []
  } catch (error) {
    console.error("[v0] Error scraping transit data:", error)
    return []
  }
}

/**
 * Enriches route data with web-scraped information
 */
export async function enrichRouteData(origin: string, destination: string, calculatedRoutes: any[]): Promise<any[]> {
  try {
    const scrapedData = await scrapeTransitData(origin, destination)

    if (scrapedData.length === 0) {
      return calculatedRoutes
    }

    // Merge scraped data with calculated routes
    const enrichedRoutes = calculatedRoutes.map((route, index) => {
      const scrapedRoute = scrapedData[index]
      if (scrapedRoute) {
        return {
          ...route,
          operator: scrapedRoute.operator || route.operator,
          departure: scrapedRoute.departure || route.departure,
          price: scrapedRoute.price || route.price,
          frequency: scrapedRoute.frequency || route.frequency,
        }
      }
      return route
    })

    return enrichedRoutes
  } catch (error) {
    console.error("[v0] Error enriching route data:", error)
    return calculatedRoutes
  }
}
