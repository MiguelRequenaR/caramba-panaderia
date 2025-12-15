import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { Package, Tag, CheckCircle, XCircle, TrendingUp, Plus } from "lucide-react";

export default function Dashboard() {
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();

  // Calcular estadísticas
  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  const availableProducts = products?.filter(p => p.is_available).length || 0;
  const unavailableProducts = products?.filter(p => !p.is_available).length || 0;

  // Productos recientes (últimos 5)
  const recentProducts = products?.slice(-5).reverse() || [];

  // Productos por categoría
  const productsByCategory = categories?.map(category => ({
    name: category.name,
    count: products?.filter(p => p.category_id === category.id).length || 0
  })) || [];

  // Encontrar el máximo para escalar el gráfico
  const maxProducts = Math.max(...productsByCategory.map(c => c.count), 1);

  if (loadingProducts || loadingCategories) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-secondary">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold text-secondary mb-2">Dashboard</h1>
        <p className="text-secondary">Bienvenido al panel de administración</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Productos */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium uppercase">Total Productos</p>
              <p className="text-3xl font-bold text-secondary mt-2">{totalProducts}</p>
            </div>
            <div className="bg-secondary p-3 rounded-full">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Total Categorías */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium uppercase">Total Categorías</p>
              <p className="text-3xl font-bold text-secondary mt-2">{totalCategories}</p>
            </div>
            <div className="bg-secondary p-3 rounded-full">
              <Tag className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Productos Disponibles */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium uppercase">Disponibles</p>
              <p className="text-3xl font-bold text-secondary mt-2">{availableProducts}</p>
            </div>
            <div className="bg-secondary p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Productos No Disponibles */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium uppercase">No Disponibles</p>
              <p className="text-3xl font-bold text-secondary mt-2">{unavailableProducts}</p>
            </div>
            <div className="bg-secondary p-3 rounded-full">
              <XCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Accesos Rápidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/productos"
            className="flex items-center gap-3 p-4 border-2 border-secondary rounded-lg hover:bg-orange-50 transition-colors group"
          >
            <div className="bg-secondary p-3 rounded-full group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-secondary">Agregar Producto</p>
              <p className="text-sm text-gray-600">Crear un nuevo producto</p>
            </div>
          </Link>

          <Link
            to="/admin/categorias"
            className="flex items-center gap-3 p-4 border-2 border-secondary rounded-lg hover:bg-orange-50 transition-colors group"
          >
            <div className="bg-secondary p-3 rounded-full group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-secondary">Agregar Categoría</p>
              <p className="text-sm text-gray-600">Crear una nueva categoría</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productos por Categoría */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-secondary mb-4">Productos por Categoría</h2>
          {productsByCategory.length > 0 ? (
            <div className="space-y-4">
              {productsByCategory.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-secondary">{category.name}</span>
                    <span className="text-sm font-bold text-secondary">{category.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(category.count / maxProducts) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay categorías disponibles</p>
          )}
        </div>

        {/* Productos Recientes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-secondary mb-4">Productos Recientes</h2>
          {recentProducts.length > 0 ? (
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-secondary">{product.name}</p>
                    <p className="text-sm text-gray-600">S/. {product.price}</p>
                  </div>
                  <div>
                    {product.is_available ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Disponible
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        No disponible
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay productos registrados</p>
          )}
        </div>
      </div>
    </div>
  );
}
