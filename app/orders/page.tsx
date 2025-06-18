"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Eye } from "lucide-react"

interface Order {
  id: string
  date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  total: number
  items: {
    destination: string
    origin: string
    quantity: number
    price: number
  }[]
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "completed",
      total: 165600,
      items: [
        {
          destination: "Buenos Aires",
          origin: "Córdoba",
          quantity: 2,
          price: 45000,
        },
        {
          destination: "Bariloche",
          origin: "Buenos Aires",
          quantity: 1,
          price: 75000,
        },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      status: "confirmed",
      total: 82280,
      items: [
        {
          destination: "Mendoza",
          origin: "Buenos Aires",
          quantity: 2,
          price: 38000,
        },
      ],
    },
    {
      id: "ORD-003",
      date: "2024-01-25",
      status: "pending",
      total: 133100,
      items: [
        {
          destination: "Ushuaia",
          origin: "Buenos Aires",
          quantity: 1,
          price: 120000,
        },
      ],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="client" userName="Juan Pérez" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Órdenes</h1>
          <p className="text-gray-600">Historial de tus reservas y paquetes</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Orden #{order.id}
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>{new Date(order.date).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{item.destination}</span>
                        <span className="text-gray-500">desde {item.origin}</span>
                        <Badge variant="outline">x{item.quantity}</Badge>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No tienes órdenes aún</p>
              <Button>Explorar Paquetes</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
