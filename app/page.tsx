import { RouteSearch } from "@/components/route-search"
import { FeaturesSection } from "@/components/features-section"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                  Travel Across Tanzania with Confidence
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl text-balance leading-relaxed">
                  Plan your journey between cities and regions with intelligent route planning. Find the fastest routes
                  and best connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <RouteSearch />
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">O</span>
              </div>
              <span className="font-semibold text-lg">OdaChap</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 OdaChap. Making travel across Tanzania easier.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
