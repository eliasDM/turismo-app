"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface Product {
  id: number
  destination: string
  origin: string
  flightClass: string
  accommodation: string
  price: number
  category: "low" | "medium" | "high"
  status: "active" | "inactive"
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      destination: "Buenos Aires",
      origin: "Córdoba",
      flightClass: "Económica",
      accommodation: "3 estrellas",
      price: 45000,
      category: "low",
      status: "active",
    },
    {
      id: 2,
      destination: "Bariloche",
      origin: "Buenos Aires",
      flightClass: "Económica",
      accommodation: "4 estrellas",
      price: 75000,
      category: "medium",
      status: "active",
    },
    {
      id: 3,
      destination: "Ushuaia",
      origin: "Buenos Aires",
      flightClass: "Business",
      accommodation: "5 estrellas",
      price: 120000,
      category: "high",
      status: "inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "low":
        return "Low Cost"
      case "medium":
        return "Medium Cost"
      case "high":
        return "High Cost"
      default:
        return category
    }
  }

  const toggleStatus = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: product.status === "active" ? "inactive" : "active" } : product,
      ),
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" userName="Admin" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
          <p className="text-gray-600">Administra los paquetes turísticos</p>
        </div>

        {/* Controles */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search">Buscar productos</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Buscar por destino u origen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="low">Low Cost</SelectItem>
                    <SelectItem value="medium">Medium Cost</SelectItem>
                    <SelectItem value="high">High Cost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de productos */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{product.destination}</h3>
                      <Badge className={getCategoryColor(product.category)}>{getCategoryText(product.category)}</Badge>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Desde {product.origin}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Vuelo: {product.flightClass}</span>
                      <span>Alojamiento: {product.accommodation}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold mb-2">${product.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toggleStatus(product.id)}>
                        {product.status === "active" ? "Desactivar" : "Activar"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No se encontraron productos</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Producto
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
