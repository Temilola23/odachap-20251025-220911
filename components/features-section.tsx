import { Bus, Clock, MapPin, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: MapPin,
    title: "Inter-Regional Routes",
    description: "Comprehensive coverage of bus and train routes connecting all major regions across Tanzania.",
  },
  {
    icon: Clock,
    title: "Real-Time Schedules",
    description: "Get accurate departure and arrival times based on current schedules and historical data.",
  },
  {
    icon: Bus,
    title: "Multiple Transport Options",
    description: "Compare buses, trains, and combination routes to find the best option for your journey.",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description: "AI-powered suggestions for the fastest and most convenient routes based on your preferences.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Why Choose OdaChap?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
            We make inter-regional travel planning simple and reliable for everyone in Tanzania.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
