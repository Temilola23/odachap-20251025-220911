interface Route {
  type: "bus" | "train"
  operator: string
  duration: string
  departure: string
  arrival: string
  price: string
  stops?: string[]
  recommended?: boolean
  frequency?: string
}

// Major transport operators in Tanzania
const BUS_OPERATORS = ["Kilimanjaro Express", "Dar Express", "Tahmeed Coach", "Sumry Bus", "Royal Coach", "Shabiby Bus"]

const TRAIN_OPERATORS = ["TAZARA Railway", "Tanzania Railways Corporation (TRC)", "SGR (Standard Gauge Railway)"]

// Calculate estimated travel time based on distance
function calculateDuration(origin: string, destination: string): number {
  // Simplified distance calculation - in production, use actual distances
  const majorCities = ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza", "Mbeya"]
  const isLongDistance = majorCities.includes(origin) && majorCities.includes(destination)

  if (isLongDistance) {
    return Math.floor(Math.random() * 6) + 8 // 8-14 hours
  }
  return Math.floor(Math.random() * 4) + 4 // 4-8 hours
}

// Generate departure time
function generateDepartureTime(): string {
  const hours = [6, 7, 8, 9, 14, 15, 16, 18, 20, 22]
  const hour = hours[Math.floor(Math.random() * hours.length)]
  const minutes = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)]
  return `${hour.toString().padStart(2, "0")}:${minutes}`
}

// Calculate arrival time
function calculateArrival(departure: string, durationHours: number): string {
  const [hours, minutes] = departure.split(":").map(Number)
  const arrivalHour = (hours + durationHours) % 24
  return `${arrivalHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}

// Generate intermediate stops
function generateStops(origin: string, destination: string): string[] {
  const allRegions = ["Morogoro", "Iringa", "Dodoma", "Singida", "Tabora", "Manyara", "Shinyanga", "Simiyu", "Mbeya"]

  const possibleStops = allRegions.filter((r) => r !== origin && r !== destination)
  const numStops = Math.floor(Math.random() * 3) + 1

  return possibleStops.sort(() => Math.random() - 0.5).slice(0, numStops)
}

export function generateRoutes(origin: string, destination: string): Route[] {
  const routes: Route[] = []

  // Generate 2-4 bus routes
  const numBusRoutes = Math.floor(Math.random() * 3) + 2
  for (let i = 0; i < numBusRoutes; i++) {
    const duration = calculateDuration(origin, destination)
    const departure = generateDepartureTime()
    const arrival = calculateArrival(departure, duration)
    const operator = BUS_OPERATORS[Math.floor(Math.random() * BUS_OPERATORS.length)]

    routes.push({
      type: "bus",
      operator,
      duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
      departure,
      arrival,
      price: `TZS ${(Math.floor(Math.random() * 30) + 20) * 1000}`,
      stops: generateStops(origin, destination),
      frequency: "Daily service",
    })
  }

  // Generate 1-2 train routes for major routes
  const majorRoutes = [
    ["Dar es Salaam", "Mbeya"],
    ["Dar es Salaam", "Kigoma"],
    ["Dar es Salaam", "Mwanza"],
    ["Dodoma", "Dar es Salaam"],
  ]

  const hasTrainRoute = majorRoutes.some(
    ([o, d]) => (o === origin && d === destination) || (o === destination && d === origin),
  )

  if (hasTrainRoute) {
    const numTrainRoutes = Math.floor(Math.random() * 2) + 1
    for (let i = 0; i < numTrainRoutes; i++) {
      const duration = calculateDuration(origin, destination) + 2 // Trains slightly slower
      const departure = generateDepartureTime()
      const arrival = calculateArrival(departure, duration)
      const operator = TRAIN_OPERATORS[Math.floor(Math.random() * TRAIN_OPERATORS.length)]

      routes.push({
        type: "train",
        operator,
        duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
        departure,
        arrival,
        price: `TZS ${(Math.floor(Math.random() * 25) + 15) * 1000}`,
        stops: generateStops(origin, destination),
        frequency: i === 0 ? "Daily service" : "3x per week",
      })
    }
  }

  // Sort by duration and mark fastest as recommended
  routes.sort((a, b) => {
    const aDuration = Number.parseInt(a.duration)
    const bDuration = Number.parseInt(b.duration)
    return aDuration - bDuration
  })

  if (routes.length > 0) {
    routes[0].recommended = true
  }

  return routes
}
