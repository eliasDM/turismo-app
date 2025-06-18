"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingCart, Package, User, LogOut, Settings, FileText } from "lucide-react"

interface NavbarProps {
  userRole: "client" | "admin"
  userName: string
}

export function Navbar({ userRole, userName }: NavbarProps) {
  const [cartItems] = useState(3) // Simular items en carrito

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const NavLinks = () => (
    <>
      <Button variant="ghost" onClick={() => scrollToSection("low-cost")} className="justify-start">
        Paquetes Low Cost
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("medium-cost")} className="justify-start">
        Paquetes Medium Cost
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("high-cost")} className="justify-start">
        Paquetes High Cost
      </Button>
      <Link href="/cart">
        <Button variant="ghost" className="justify-start relative">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Carrito
          {cartItems > 0 && (
            <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
              {cartItems}
            </Badge>
          )}
        </Button>
      </Link>
      <Link href="/orders">
        <Button variant="ghost" className="justify-start">
          <Package className="w-4 h-4 mr-2" />
          Mis Órdenes
        </Button>
      </Link>
      {userRole === "admin" && (
        <>
          <Link href="/product-management">
            <Button variant="ghost" className="justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Gestión de Productos
            </Button>
          </Link>
          <Link href="/order-management">
            <Button variant="ghost" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Gestión de Órdenes
            </Button>
          </Link>
        </>
      )}
    </>
  )

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-900">
            TurismoApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Button variant="ghost" onClick={() => scrollToSection("low-cost")}>
              Paquetes Low Cost
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("medium-cost")}>
              Paquetes Medium Cost
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("high-cost")}>
              Paquetes High Cost
            </Button>
            <Link href="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrito
                {cartItems > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/orders">
              <Button variant="ghost">
                <Package className="w-4 h-4 mr-2" />
                Mis Órdenes
              </Button>
            </Link>
            {userRole === "admin" && (
              <>
                <Link href="/product-management">
                  <Button variant="ghost">
                    <Settings className="w-4 h-4 mr-2" />
                    Gestión de Productos
                  </Button>
                </Link>
                <Link href="/order-management">
                  <Button variant="ghost">
                    <FileText className="w-4 h-4 mr-2" />
                    Gestión de Órdenes
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden lg:flex">
                  <User className="w-4 h-4 mr-2" />
                  {userName} {userRole === "admin" && "(Admin)"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <User className="w-5 h-5" />
                    <span className="font-medium">
                      {userName} {userRole === "admin" && "(Admin)"}
                    </span>
                  </div>
                  <NavLinks />
                  <div className="pt-4 border-t">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
