export interface Location {
  name: string
  type: "region" | "city"
  region?: string // For cities, which region they belong to
  coordinates?: { lat: number; lng: number }
}

export const TANZANIAN_LOCATIONS: Location[] = [
  // Major Cities
  { name: "Dar es Salaam", type: "city", region: "Dar es Salaam", coordinates: { lat: -6.7924, lng: 39.2083 } },
  { name: "Dodoma", type: "city", region: "Dodoma", coordinates: { lat: -6.163, lng: 35.7516 } },
  { name: "Mwanza", type: "city", region: "Mwanza", coordinates: { lat: -2.5164, lng: 32.9175 } },
  { name: "Arusha", type: "city", region: "Arusha", coordinates: { lat: -3.3869, lng: 36.683 } },
  { name: "Mbeya", type: "city", region: "Mbeya", coordinates: { lat: -8.9094, lng: 33.4606 } },
  { name: "Morogoro", type: "city", region: "Morogoro", coordinates: { lat: -6.8235, lng: 37.6609 } },
  { name: "Tanga", type: "city", region: "Tanga", coordinates: { lat: -5.0689, lng: 39.0982 } },
  { name: "Zanzibar City", type: "city", region: "Zanzibar West", coordinates: { lat: -6.1659, lng: 39.2026 } },
  { name: "Kigoma", type: "city", region: "Kigoma", coordinates: { lat: -4.8772, lng: 29.629 } },
  { name: "Moshi", type: "city", region: "Kilimanjaro", coordinates: { lat: -3.3397, lng: 37.3407 } },
  { name: "Tabora", type: "city", region: "Tabora", coordinates: { lat: -5.0167, lng: 32.8 } },
  { name: "Iringa", type: "city", region: "Iringa", coordinates: { lat: -7.7667, lng: 35.6833 } },
  { name: "Singida", type: "city", region: "Singida", coordinates: { lat: -4.8167, lng: 34.7333 } },
  { name: "Shinyanga", type: "city", region: "Shinyanga", coordinates: { lat: -3.6636, lng: 33.4217 } },
  { name: "Bukoba", type: "city", region: "Kagera", coordinates: { lat: -1.3314, lng: 31.8122 } },
  { name: "Musoma", type: "city", region: "Mara", coordinates: { lat: -1.5, lng: 33.8 } },
  { name: "Sumbawanga", type: "city", region: "Rukwa", coordinates: { lat: -7.9667, lng: 31.6167 } },
  { name: "Songea", type: "city", region: "Ruvuma", coordinates: { lat: -10.6833, lng: 35.65 } },
  { name: "Mtwara", type: "city", region: "Mtwara", coordinates: { lat: -10.2692, lng: 40.1836 } },
  { name: "Lindi", type: "city", region: "Lindi", coordinates: { lat: -9.9971, lng: 39.7177 } },

  // Regions (for regional travel)
  { name: "Arusha Region", type: "region" },
  { name: "Dar es Salaam Region", type: "region" },
  { name: "Dodoma Region", type: "region" },
  { name: "Geita Region", type: "region" },
  { name: "Iringa Region", type: "region" },
  { name: "Kagera Region", type: "region" },
  { name: "Katavi Region", type: "region" },
  { name: "Kigoma Region", type: "region" },
  { name: "Kilimanjaro Region", type: "region" },
  { name: "Lindi Region", type: "region" },
  { name: "Manyara Region", type: "region" },
  { name: "Mara Region", type: "region" },
  { name: "Mbeya Region", type: "region" },
  { name: "Morogoro Region", type: "region" },
  { name: "Mtwara Region", type: "region" },
  { name: "Mwanza Region", type: "region" },
  { name: "Njombe Region", type: "region" },
  { name: "Pemba North Region", type: "region" },
  { name: "Pemba South Region", type: "region" },
  { name: "Pwani Region", type: "region" },
  { name: "Rukwa Region", type: "region" },
  { name: "Ruvuma Region", type: "region" },
  { name: "Shinyanga Region", type: "region" },
  { name: "Simiyu Region", type: "region" },
  { name: "Singida Region", type: "region" },
  { name: "Songwe Region", type: "region" },
  { name: "Tabora Region", type: "region" },
  { name: "Tanga Region", type: "region" },
  { name: "Zanzibar North Region", type: "region" },
  { name: "Zanzibar South Region", type: "region" },
  { name: "Zanzibar West Region", type: "region" },
]

// Helper function to get all location names for the select dropdown
export function getAllLocationNames(): string[] {
  return TANZANIAN_LOCATIONS.map((loc) => loc.name).sort()
}

// Helper function to get location details
export function getLocation(name: string): Location | undefined {
  return TANZANIAN_LOCATIONS.find((loc) => loc.name === name)
}

// Helper function to calculate approximate distance between two locations
export function calculateDistance(loc1: Location, loc2: Location): number {
  if (!loc1.coordinates || !loc2.coordinates) {
    // Fallback: estimate based on type
    return 300 // Default 300km
  }

  const R = 6371 // Earth's radius in km
  const dLat = ((loc2.coordinates.lat - loc1.coordinates.lat) * Math.PI) / 180
  const dLon = ((loc2.coordinates.lng - loc1.coordinates.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.coordinates.lat * Math.PI) / 180) *
      Math.cos((loc2.coordinates.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
