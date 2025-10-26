"use client"

import { useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LocationSelect } from "@/components/location-select"
import { RouteResults } from "@/components/route-results"
import { getAllLocationNames } from "@/lib/locations"

export function RouteSearch() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async () => {
    if (!origin || !destination) return

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSearching(false)
    setShowResults(true)
  }

  const handleSwap = () => {
    const temp = origin
    setOrigin(destination)
    setDestination(temp)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr] md:items-end">
              <LocationSelect
                label="From"
                placeholder="Select city or region"
                value={origin}
                onChange={setOrigin}
                locations={getAllLocationNames()}
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwap}
                className="hidden md:flex self-end mb-2"
                disabled={!origin && !destination}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Swap locations</span>
              </Button>

              <LocationSelect
                label="To"
                placeholder="Select city or region"
                value={destination}
                onChange={setDestination}
                locations={getAllLocationNames()}
              />
            </div>

            <Button
              onClick={handleSwap}
              variant="outline"
              className="w-full md:hidden bg-transparent"
              disabled={!origin && !destination}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Swap Locations
            </Button>
          </div>

          <Button
            onClick={handleSearch}
            disabled={!origin || !destination || isSearching}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isSearching ? (
              <>
                <div className="h-4 w-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Searching Routes...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Search Routes
              </>
            )}
          </Button>
        </div>
      </Card>

      {showResults && origin && destination && <RouteResults origin={origin} destination={destination} />}
    </div>
  )
}
