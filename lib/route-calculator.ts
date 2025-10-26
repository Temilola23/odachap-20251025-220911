import { getLocation, calculateDistance } from "./locations"

export interface Route {
  type: "bus" | "train"
  operator: string
  duration: string
  departure: string
  arrival: string
  price: string
  stops?: string[]
  recommended?: boolean
  frequency?: string
  distance?: number
}

// Major transport operators in Tanzania
const BUS_OPERATORS = [
  "Kilimanjaro Express",
  "Dar Express",
  "Tahmeed Coach",
  "Sumry Bus",
  "Royal Coach",
  "Shabiby Bus",
  "Abood Coach",
  "Mtei Express",
]

const TRAIN_OPERATORS = ["TAZARA Railway", "Tanzania Railways Corporation (TRC)", "SGR (Standard Gauge Railway)"]

// Major train routes in Tanzania
const TRAIN_ROUTES = [
  { from: "Dar es Salaam", to: "Mbeya", operator: "TAZARA Railway" },
  { from: "Dar es Salaam", to: "Kigoma", operator: "TRC" },
  { from: "Dar es Salaam", to: "Mwanza", operator: "TRC" },
  { from: "Dodoma", to: "Dar es Salaam", operator: "SGR" },
  { from: "Dar es Salaam", to: "Morogoro", operator: "SGR" },
  { from: "Morogoro", to: "Dodoma", operator: "SGR" },
]

// Calculate travel duration based on actual distance
function calculateDuration(distance: number, transportType: "bus" | "train"): number {
  // Average speeds: Bus ~60km/h, Train ~50km/h (accounting for stops)
  const avgSpeed = transportType === "bus" ? 60 : 50
  return distance / avgSpeed
}

// Generate realistic departure times
function generateDepartureTimes(count: number): string[] {
  const times = []
  const commonDepartures = ["06:00", "07:30", "09:00", "14:00", "15:30", "18:00", "20:00", "22:00"]

  for (let i = 0; i < count; i++) {
    times.push(commonDepartures[i % commonDepartures.length])
  }

  return times.sort()
}

// Calculate arrival time
function calculateArrival(departure: string, durationHours: number): string {
  const [hours, minutes] = departure.split(":").map(Number)
  const totalMinutes = hours * 60 + minutes + durationHours * 60
  const arrivalHour = Math.floor(totalMinutes / 60) % 24
  const arrivalMinute = Math.floor(totalMinutes % 60)

  return `${arrivalHour.toString().padStart(2, "0")}:${arrivalMinute.toString().padStart(2, "0")}`
}

// Format duration
function formatDuration(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m}m`
}

// Calculate price based on distance and transport type
function calculatePrice(distance: number, transportType: "bus" | "train"): string {
  // Base price per km: Bus ~50 TZS/km, Train ~40 TZS/km
  const pricePerKm = transportType === "bus" ? 50 : 40
  const basePrice = distance * pricePerKm

  // Add some variation
  const variation = basePrice * (Math.random() * 0.2 - 0.1) // ±10%
  const finalPrice = Math.round((basePrice + variation) / 1000) * 1000 // Round to nearest 1000

  return `TZS ${finalPrice.toLocaleString()}`
}

// Check if train route exists
function hasTrainRoute(origin: string, destination: string): boolean {
  return TRAIN_ROUTES.some(
    (route) =>
      (route.from === origin && route.to === destination) || (route.from === destination && route.to === origin),
  )
}

// Get train operator for route
function getTrainOperator(origin: string, destination: string): string {
  const route = TRAIN_ROUTES.find(
    (r) => (r.from === origin && r.to === destination) || (r.from === destination && r.to === origin),
  )
  return route?.operator || TRAIN_OPERATORS[0]
}

export async function calculateRoutes(originName: string, destinationName: string): Promise<Route[]> {
  const routes: Route[] = []

  const origin = getLocation(originName)
  const destination = getLocation(destinationName)

  if (!origin || !destination) {
    return routes
  }

  // Calculate distance
  const distance = calculateDistance(origin, destination)

  console.log("[v0] Calculating routes:", { originName, destinationName, distance: `${distance.toFixed(0)}km` })

  // Generate bus routes (always available)
  const numBusRoutes = Math.min(4, Math.floor(distance / 100) + 2) // More routes for longer distances
  const busDepartures = generateDepartureTimes(numBusRoutes)

  for (let i = 0; i < numBusRoutes; i++) {
    const duration = calculateDuration(distance, "bus")
    const departure = busDepartures[i]
    const arrival = calculateArrival(departure, duration)
    const operator = BUS_OPERATORS[i % BUS_OPERATORS.length]

    routes.push({
      type: "bus",
      operator,
      duration: formatDuration(duration),
      departure,
      arrival,
      price: calculatePrice(distance, "bus"),
      frequency: "Daily service",
      distance: Math.round(distance),
    })
  }

  // Generate train routes if available
  if (hasTrainRoute(originName, destinationName)) {
    const numTrainRoutes = 2
    const trainDepartures = ["08:00", "16:00"]

    for (let i = 0; i < numTrainRoutes; i++) {
      const duration = calculateDuration(distance, "train") + 1 // Trains slightly slower
      const departure = trainDepartures[i]
      const arrival = calculateArrival(departure, duration)
      const operator = getTrainOperator(originName, destinationName)

      routes.push({
        type: "train",
        operator,
        duration: formatDuration(duration),
        departure,
        arrival,
        price: calculatePrice(distance, "train"),
        frequency: i === 0 ? "Daily service" : "3x per week",
        distance: Math.round(distance),
      })
    }
  }

  // Sort by duration and mark fastest as recommended
  routes.sort((a, b) => {
    const aDuration = Number.parseFloat(a.duration)
    const bDuration = Number.parseFloat(b.duration)
    return aDuration - bDuration
  })

  if (routes.length > 0) {
    routes[0].recommended = true
  }

  console.log("[v0] Generated routes:", routes.length)

  return routes
}
