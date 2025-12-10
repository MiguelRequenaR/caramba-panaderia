import { useCategories } from "@/hooks/useCategories";
import CategoryCard from "@/components/CategoryCard";

export default function CategorySection() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-secondary">
          Cargando categorías...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center"> 
        <p className="text-2xl text-red-600">
          Error al cargar categorías: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="py-20 bg-[#f8f7ee]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {categories?.length === 0 && (
          <p className="text-center text-gray-500">
            No hay categorías disponibles
          </p>
        )}
      </div>     
    </div>
  )
}
