import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import Button from "@/components/Button";
import FormAddProduct from "./components/FormAddProduct";
import { X, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/schemas";

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();

  const getCategoryName = (categoryId: number) => {
    const category = categories?.find((category) => category.id === categoryId);
    return category?.name || 'Categoría no encontrada';
  };

  const handleOpenModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }

  const handleDelete = async (product: Product) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`)) {
      return;
    }
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);
      
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(`Producto eliminado correctamente`);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Error al eliminar el producto: ${error.message}`);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-secondary">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-red-600">Error al cargar productos: {error.message}</p>
      </div>
    )
  }

  return (
    <section data-aos="fade-up" data-aos-delay="100">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Productos</h1>
          <p className="text-gray-600">Gestiona todos tus productos</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Agregar Producto</Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
          data-aos="zoom-in"
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-secondary uppercase">
                {selectedProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="cursor-pointer text-red-500 text-2xl font-bold"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <FormAddProduct onClose={handleCloseModal} product={selectedProduct} />
            </div>
          </div>
        </div>
      )}

      {products && products.length > 0 ? (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-secondary text-lg uppercase font-bold border-b-2 border-secondary">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Imagen</th>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Precio</th>
                  <th className="px-4 py-3 text-left">Categoría</th>
                  <th className="px-4 py-3 text-left">Disponible</th>
                  <th className="px-4 py-3 text-left">Descripción</th>
                  <th className="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-orange-300">
                    <td className="px-4 py-3 text-sm text-secondary">{product.id}</td>
                    <td className="px-4 py-3">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-secondary text-xs">Sin imagen</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-secondary">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      S/.{product.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      {getCategoryName(product.category_id)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.is_available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.is_available ? 'Disponible' : 'No disponible'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary max-w-xs">
                      <p className="truncate" title={product.description || ''}>
                        {product.description || 'Sin descripción'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-secondary cursor-pointer rounded transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="p-2 text-secondary cursor-pointer rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-lg shadow-md p-8 text-center">
          <p className="text-secondary">No hay productos registrados</p>
        </div>
      )}
    </section>
  )
}
