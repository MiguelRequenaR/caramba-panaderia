import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import Button from "@/components/Button";
import FormAddCategory from "./components/FormAddCategory";
import { X, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { Category } from "@/schemas";

export default function CategoryProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const queryClient = useQueryClient();
  const { data: categories, isLoading, error } = useCategories();

  const handleOpenModal = (category?: Category) => {
    setSelectedCategory(category || null);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  }

  const handleDelete = async (category: Category) => {
    // Validar si la categoría tiene productos
    if (category.product_count && category.product_count > 0) {
      toast.error(`No puedes eliminar la categoría "${category.name}" porque tiene ${category.product_count} producto(s) asociado(s).`);
      return;
    }

    if (!confirm(`¿Estás seguro de que deseas eliminar la categoría "${category.name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id);
      
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(`Categoría eliminada correctamente`);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Error al eliminar la categoría: ${error.message}`);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-secondary">Cargando categorías...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-red-600">Error al cargar categorías: {error.message}</p>
      </div>
    )
  }

  return (
    <section data-aos="fade-up" data-aos-delay="100">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-2">Categorías</h2>
          <p className="text-gray-600">Gestiona todas tus categorías</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Agregar Categoría</Button>
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
                {selectedCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
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
              <FormAddCategory onClose={handleCloseModal} category={selectedCategory} />
            </div>
          </div>
        </div>
      )}

      {categories && categories.length > 0 ? (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-secondary text-lg uppercase font-bold border-b-2 border-secondary">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Imagen</th>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-left">N° Productos</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-orange-300">
                    <td className="px-4 py-3 text-sm text-secondary">{category.id}</td>
                    <td className="px-4 py-3">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-secondary text-xs">Sin imagen</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-secondary">
                      {category.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      /{category.slug}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {category.product_count || 0} producto(s)
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(category)}
                          className="p-2 text-secondary cursor-pointer rounded transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          className="p-2 text-secondary cursor-pointer rounded transition-colors"
                          title="Eliminar"
                          disabled={category.product_count > 0}
                        >
                          <Trash2 className={`w-5 h-5 ${category.product_count > 0 ? 'opacity-30' : ''}`} />
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
          <p className="text-secondary">No hay categorías registradas</p>
        </div>
      )}
    </section>
  )
}
