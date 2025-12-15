import { Link, useLocation } from "react-router-dom"
import { Search, User, ShoppingCart, X, Menu, ChevronRight, Minus, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useCartStore } from "@/store/useCartStore"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import type { Product } from "@/schemas"
import generateSlug from "@/utils/generateSlug"

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { cart, total, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  const filteredProducts = searchQuery.trim() === "" 
    ? [] 
    : products.filter((product: Product) => 
        product.is_available && (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

  const handleRemoveFromCart = (productId: number) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      removeFromCart(productId);
      toast.error("Producto eliminado del carrito.")
    }
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }

  const handleProductClick = (productId: number, categoryId: number, productName: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const categorySlug = category?.slug || 'sin-categoria';
    const productSlug = generateSlug(productName);
    
    navigate(`/productos/${categorySlug}/${productSlug}-${productId}`);
    handleCloseSearch();
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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
    <nav
      className="bg-primary text-secondary relative">
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-60 bg-[#f8f7ee] text-secondary transition-all duration-300 ${isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } overflow-y-auto`}
      >
        <div className="flex items-center justify-center p-10 gap-4 sticky top-0 bg-[#f8f7ee] z-10 border-b border-secondary/10">
          <div className="flex-1 max-w-4xl relative">
            <input
              type="text"
              placeholder="Buscar en nuestra tienda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-lg border-2 border-secondary focus:outline-none focus:border-secondary/70 text-lg"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary cursor-pointer" />
          </div>
          <X
            className="cursor-pointer hover:rotate-90 transition-transform duration-300"
            size={32}
            onClick={handleCloseSearch}
          />
        </div>

        {/* Resultados de búsqueda */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {searchQuery.trim() !== "" && (
            <>
              {filteredProducts.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {filteredProducts.map((product: Product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id, product.category_id, product.name)}
                        className="overflow-hidden border-2 border-secondary rounded-lg p-2 transition-all duration-300 cursor-pointer "
                      >
                        {product.image_url && (
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold text-lg text-secondary mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-secondary">
                              S/.{product.price.toFixed(2)}
                            </span>
                            {product.is_available && (
                              <span className="text-xs text-green-600 font-semibold">
                                Disponible
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <Search className="mx-auto mb-4 text-secondary font-bold" size={64} />
                  <h2 className="text-2xl font-bold mb-2">No se encontraron productos</h2>
                  <p className="text-secondary">
                    No encontramos productos que coincidan con "{searchQuery}". Intenta con otros términos de búsqueda.
                  </p>
                </div>
              )}
            </>
          )}
          {searchQuery.trim() === "" && (
            <div className="text-center py-16">
              <Search className="mx-auto mb-4 text-secondary font-bold" size={64} />
              <h2 className="text-2xl font-bold mb-2">Busca tus productos favoritos</h2>
              <p className="text-secondary">
                Escribe el nombre del producto que estás buscando
              </p>
            </div>
          )}
        </div>
      </div>

      {(isMobileMenuOpen || isCartOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-60 transition-opacity duration-300"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}

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
                    <p className="text-sm text-gray-600">S/.{item.price.toFixed(2)}</p>
                    {item.deliveryDay && item.deliveryTime && (
                      <div className="text-xs text-gray-600 mt-2 space-y-1">
                        <p className="font-medium">
                          Entrega: {new Date(item.deliveryDay + 'T00:00:00').toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="font-medium">
                          Horario: {item.deliveryTime === "09am-1pm" ? "09:00 AM - 1:00 PM" : item.deliveryTime === "1pm-8pm" ? "1:00 PM - 8:00 PM" : item.deliveryTime}
                        </p>
                      </div>
                    )}
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
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                    <p className="font-semibold text-secondary">
                      S/.{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-secondary">S/.{total.toFixed(2)}</span>
              </div>
              <button 
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors cursor-pointer"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? "bg-primary text-secondary" 
            : "bg-transparent text-white hover:bg-primary hover:text-secondary"
        }`}>
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
            <User 
              className="cursor-pointer" 
              size={24} 
              onClick={() => navigate("/auth/login")}
            />
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
              <User 
                className="cursor-pointer" 
                onClick={() => navigate("/auth/login")}
              />
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
              <ul className="flex justify-center items-center gap-10 font-bold">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative group cursor-pointer"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5
                          ${location.pathname === link.href
                            ? `w-full ${isScrolled || !isHomePage ? "bg-secondary" : "bg-white"}`
                            : "w-0"
                          }
                          group-hover:w-full group-hover:bg-secondary
                          transition-all duration-300 ease-in-out
                        `}
                      ></span>
                    </span>
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
}
