"use client"

import { useEffect, useState } from "react"
import { Bus, Train, Clock, TrendingUp, MapPin, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { calculateRoutes, type Route } from "@/lib/route-calculator"

interface RouteResultsProps {
  origin: string
  destination: string
}

export function RouteResults({ origin, destination }: RouteResultsProps) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRoutes() {
      setLoading(true)
      console.log("[v0] Loading routes for:", origin, "to", destination)
      const calculatedRoutes = await calculateRoutes(origin, destination)
      setRoutes(calculatedRoutes)
      setLoading(false)
    }

    loadRoutes()
  }, [origin, destination])

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Calculating best routes...</p>
        </div>
      </Card>
    )
  }

  if (routes.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">No routes found</p>
          <p className="text-sm text-muted-foreground">
            Try selecting different locations or check back later for updates.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Routes</h2>
        <Badge variant="secondary" className="text-sm">
          {routes.length} {routes.length === 1 ? "option" : "options"}
        </Badge>
      </div>

      <div className="grid gap-4">
        {routes.map((route, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {route.type === "bus" ? (
                      <Bus className="h-5 w-5 text-primary" />
                    ) : (
                      <Train className="h-5 w-5 text-primary" />
                    )}
                    <CardTitle className="text-lg">{route.operator}</CardTitle>
                    {route.recommended && <Badge className="bg-accent text-accent-foreground">Fastest</Badge>}
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {route.type === "bus" ? "Bus Service" : "Train Service"}
                    {route.distance && <span className="ml-2">• {route.distance}km</span>}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{route.duration}</div>
                  <div className="text-sm text-muted-foreground">total time</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Departure:</span>
                    <span className="text-muted-foreground">{route.departure}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Arrival:</span>
                    <span className="text-muted-foreground">{route.arrival}</span>
                  </div>
                </div>

                {route.stops && route.stops.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      Stops along the way
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {route.stops.map((stop, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {stop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm text-muted-foreground">
                    Estimated price: <span className="font-semibold text-foreground">{route.price}</span>
                  </div>
                  {route.frequency && <div className="text-sm text-muted-foreground">{route.frequency}</div>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
