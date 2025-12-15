import { useState, useEffect } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { LayoutDashboard, LogOut, PackageSearch, ChartBarStacked, Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [session, setSession] = useState<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    //verificar sesion inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    //escuchar cambios en la sesion
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  //estado de carga para que no parpade el login si ya se esta logueado
  if (session === null) return <div className="flex justify-center items-center h-screen text-secondary">Verificando sesión...</div>

  //si no hay sesion redirigir al login
  if (!session) return <Navigate to="/auth/login" />

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8f7ee]">
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-secondary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay oscuro */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menú lateral móvil */}
      <aside
        className={`
          md:hidden fixed top-0 left-0 h-full w-64 bg-secondary p-6 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <h2 className="text-2xl font-bold mb-8 text-white uppercase mt-16">Panel Admin</h2>
        <nav className="space-y-4 flex flex-col">
          <Link
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/productos"
            onClick={handleLinkClick}
            className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
          >
            <PackageSearch className="w-6 h-6" />
            <span>Productos</span>
          </Link>
          <Link
            to="/admin/categorias"
            onClick={handleLinkClick}
            className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
          >
            <ChartBarStacked className="w-6 h-6" />
            <span>Categorías</span>
          </Link>
        </nav>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all mt-8 w-full"
        >
          <LogOut className="w-6 h-6" />
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* Sidebar Desktop */}
      <aside className="w-20 m-5 rounded-full bg-secondary p-6 hidden md:flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8 text-white uppercase">AD</h2>
        <nav className="space-y-4 flex flex-col items-center flex-1">
          <Link to="/admin/dashboard" className="flex justify-center items-center text-white hover:font-bold transition-all">
            <LayoutDashboard className="w-7 h-7" />
          </Link>
          <Link to="/admin/productos" className="flex justify-center items-center text-white hover:font-bold transition-all">
            <PackageSearch className="w-7 h-7" />
          </Link>
          <Link to="/admin/categorias" className="flex justify-center items-center text-white hover:font-bold transition-all">
            <ChartBarStacked className="w-7 h-7" />
          </Link>
        </nav>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex justify-center items-center text-white text-sm hover:underline cursor-pointer"
        >
          <LogOut className="w-7 h-7" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
