"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, User, Search, Eye, CheckCircle, XCircle } from "lucide-react"

interface Order {
  id: string
  customerName: string
  customerEmail: string
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

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Juan Pérez",
      customerEmail: "juan@email.com",
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
      ],
    },
    {
      id: "ORD-002",
      customerName: "María García",
      customerEmail: "maria@email.com",
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
      customerName: "Carlos López",
      customerEmail: "carlos@email.com",
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

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

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

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" userName="Admin" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Órdenes</h1>
          <p className="text-gray-600">Administra las reservas de los clientes</p>
        </div>

        {/* Controles */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search">Buscar órdenes</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Buscar por ID, cliente o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de órdenes */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Orden #{order.id}
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>{new Date(order.date).toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{order.customerEmail}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>
                        {item.destination} desde {item.origin} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => updateOrderStatus(order.id, "confirmed")}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirmar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => updateOrderStatus(order.id, "cancelled")}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    )}
                    {order.status === "confirmed" && (
                      <Button size="sm" onClick={() => updateOrderStatus(order.id, "completed")}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completar
                      </Button>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-xl text-gray-500">No se encontraron órdenes</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
