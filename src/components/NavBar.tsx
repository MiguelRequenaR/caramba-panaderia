import { Link } from "react-router-dom"
import { Search, User, ShoppingCart, X, Menu, ChevronRight, Minus, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useCartStore } from "@/store/useCartStore"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cart, total, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const links = [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Productos",
      href: "/productos",
    },
    {
      label: "Nosotros",
      href: "/nosotros",
    },
    {
      label: "Ubicación",
      href: "/ubicacion",
    },
    {
      label: "Contacto",
      href: "/contacto",
    }
  ]
  return (
    <main
      className="bg-primary text-secondary relative">
      <img src="https://images.unsplash.com/photo-1586765501508-cffc1fe200c8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="banner" className="w-full h-[60vh] object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      { /* Barra de búsqueda al dar click en el icono de búsqueda */}
      <div
        className={`fixed top-0 left-0 right-0 z-60 bg-[#f8f7ee] text-secondary transition-all duration-300 ${isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <div className="flex items-center justify-center p-10 gap-4">
          <div className="flex-1 max-w-4xl relative">
            <input
              type="text"
              placeholder="Buscar en nuestra tienda"
              className="w-full px-6 py-4 pr-12 rounded-lg border-2 border-secondary focus:outline-none focus:border-secondary/70 text-lg"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary cursor-pointer" />
          </div>
          <X
            className="cursor-pointer hover:rotate-90 transition-transform duration-300"
            size={32}
            onClick={() => setIsSearchOpen(false)}
          />
        </div>
      </div>

      {/* Overlay para cerrar menús */}
      {(isMobileMenuOpen || isCartOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-60 transition-opacity duration-300"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}

      {/* Menú móvil - desde la izquierda */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-primary text-secondary z-70 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-secondary/20">
          <h2 className="text-xl font-bold uppercase">Caramba Panadería</h2>
          <X
            className="cursor-pointer hover:rotate-90 transition-transform duration-300"
            size={32}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <nav className="px-8 py-4">
          <ul className="space-y-6">
            <li>
              <Link 
                to="/" 
                className="text-2xl font-medium block hover:translate-x-2 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li className="flex items-center justify-between">
              <Link 
                to="/productos" 
                className="text-2xl font-medium block hover:translate-x-2 transition-transform flex-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tienda Online
              </Link>
              <ChevronRight size={24} />
            </li>
            <li>
              <Link 
                to="/nosotros" 
                className="text-2xl font-medium block hover:translate-x-2 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nuestra Historia
              </Link>
            </li>
            <li>
              <Link 
                to="/ubicacion" 
                className="text-2xl font-medium block hover:translate-x-2 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ubicación
              </Link>
            </li>
            <li>
              <Link 
                to="/contacto" 
                className="text-2xl font-medium block hover:translate-x-2 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Panel de carrito - desde la derecha */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-md bg-white z-70 transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-secondary">Tu Carrito</h2>
          <X
            className="cursor-pointer hover:rotate-90 transition-transform duration-300 text-secondary"
            size={32}
            onClick={() => setIsCartOpen(false)}
          />
        </div>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-gray-500 text-center">
              Tu carrito está vacío
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  {item.image_url && (
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                    <p className="font-semibold text-secondary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-secondary">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors">
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-primary text-secondary" 
            : "bg-transparent text-white hover:bg-primary hover:text-secondary"
        }`}>
        {/* Navbar Mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 md:p-6">
          <Menu
            className="cursor-pointer"
            size={28}
            onClick={() => setIsMobileMenuOpen(true)}
          />
          <Link to="/">
            <h1 className="text-xl md:text-2xl uppercase font-bold text-secondary">
              Caramba Panadería
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <User className="cursor-pointer" size={24} />
            <div className="relative">
              <ShoppingCart 
                className="cursor-pointer" 
                size={24}
                onClick={() => setIsCartOpen(true)}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navbar Desktop */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between p-10">
            <Search
              className="cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            />
            <Link to="/">
              <h1 className="text-4xl uppercase font-bold">
                Caramba Panadería y Pastelería
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <User className="cursor-pointer" />
              <div className="relative">
                <ShoppingCart 
                  className="cursor-pointer"
                  onClick={() => setIsCartOpen(true)}
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <nav>
              <ul className="flex justify-center items-center gap-10 font-bold pb-4">
                {links.map((link) => (
                  <div
                    key={link.href}
                    className="relative group cursor-pointer"
                    onClick={() => setActiveLink(link.href)}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5
                          ${activeLink === link.href
                            ? `w-full ${isScrolled ? "bg-secondary" : "bg-white"}`
                            : "w-0"
                          }
                          group-hover:w-full group-hover:bg-secondary
                          transition-all duration-300 ease-in-out
                        `}
                      ></span>
                    </span>
                  </div>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  )
}
