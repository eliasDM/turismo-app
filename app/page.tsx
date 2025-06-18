"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { PackageSection } from "@/components/package-section"

// Datos de ejemplo para los paquetes
const lowCostPackages = [
  {
    id: 1,
    destination: "Buenos Aires",
    origin: "Córdoba",
    flightClass: "Económica",
    accommodation: "3 estrellas",
    capacity: "1-8 personas",
    price: 45000,
    rating: 4.2,
    reviews: 156,
    weather: "22°C - Soleado",
  },
  {
    id: 2,
    destination: "Mendoza",
    origin: "Buenos Aires",
    flightClass: "Económica",
    accommodation: "3 estrellas",
    capacity: "1-8 personas",
    price: 38000,
    rating: 4.0,
    reviews: 89,
    weather: "18°C - Parcialmente nublado",
  },
]

const mediumCostPackages = [
  {
    id: 3,
    destination: "Bariloche",
    origin: "Buenos Aires",
    flightClass: "Económica",
    accommodation: "4 estrellas",
    capacity: "1-8 personas",
    price: 75000,
    rating: 4.5,
    reviews: 234,
    weather: "12°C - Nieve",
  },
  {
    id: 4,
    destination: "Salta",
    origin: "Buenos Aires",
    flightClass: "Económica",
    accommodation: "4 estrellas",
    capacity: "1-8 personas",
    price: 68000,
    rating: 4.3,
    reviews: 178,
    weather: "25°C - Soleado",
  },
]

const highCostPackages = [
  {
    id: 5,
    destination: "Ushuaia",
    origin: "Buenos Aires",
    flightClass: "Business",
    accommodation: "5 estrellas",
    capacity: "1-8 personas",
    price: 120000,
    rating: 4.8,
    reviews: 92,
    weather: "8°C - Ventoso",
  },
  {
    id: 6,
    destination: "El Calafate",
    origin: "Buenos Aires",
    flightClass: "Económica/Business",
    accommodation: "5 estrellas",
    capacity: "1-8 personas",
    price: 110000,
    rating: 4.7,
    reviews: 145,
    weather: "15°C - Parcialmente nublado",
  },
]

export default function HomePage() {
  const [userRole] = useState<"client" | "admin">("client") // Simular rol de usuario

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={userRole} userName="Juan Pérez" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Descubre tu próximo destino</h1>
          <p className="text-xl text-gray-600">Encuentra los mejores paquetes turísticos adaptados a tu presupuesto</p>
        </div>

        <div className="space-y-12">
          <PackageSection
            title="Paquetes Low Cost"
            description="Viajes económicos sin comprometer la calidad"
            packages={lowCostPackages}
            color="green"
          />

          <PackageSection
            title="Paquetes Medium Cost"
            description="El equilibrio perfecto entre precio y comodidad"
            packages={mediumCostPackages}
            color="blue"
          />

          <PackageSection
            title="Paquetes High Cost"
            description="Experiencias de lujo para momentos especiales"
            packages={highCostPackages}
            color="purple"
          />
        </div>
      </main>
    </div>
  )
}
