import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Plane, Hotel, Users, Cloud } from "lucide-react"

interface Package {
  id: number
  destination: string
  origin: string
  flightClass: string
  accommodation: string
  capacity: string
  price: number
  rating: number
  reviews: number
  weather: string
}

interface PackageSectionProps {
  title: string
  description: string
  packages: Package[]
  color: "green" | "blue" | "purple"
}

export function PackageSection({ title, description, packages, color }: PackageSectionProps) {
  const colorClasses = {
    green: "border-green-200 bg-green-50",
    blue: "border-blue-200 bg-blue-50",
    purple: "border-purple-200 bg-purple-50",
  }

  const badgeColors = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
  }

  const sectionId = title.toLowerCase().replace(/\s+/g, "-").replace("paquetes-", "")

  return (
    <section id={sectionId} className="scroll-mt-20">
      <div className={`rounded-lg p-6 ${colorClasses[color]}`}>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {pkg.destination}
                    </CardTitle>
                    <CardDescription>Desde {pkg.origin}</CardDescription>
                  </div>
                  <Badge className={badgeColors[color]}>${pkg.price.toLocaleString()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-gray-500" />
                    <span>{pkg.flightClass}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-gray-500" />
                    <span>{pkg.accommodation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{pkg.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-gray-500" />
                    <span>{pkg.weather}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{pkg.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({pkg.reviews} reseñas)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Agregar al Carrito</Button>
                  <Button variant="outline">Ver Detalles</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
