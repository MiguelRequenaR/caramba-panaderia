import { useCategories } from "@/hooks/useCategories";

export default function CategoryCard() {
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
          {categories?.map((category) => {
            const productCount = category.product_count || 0;
            return (
              <div
                key={category.id}
                className="space-y-3 mx-6">
                <img 
                  src={category.image_url} 
                  alt={category.name}
                  data-aos="fade-up"
                  className="h-[250px] w-full md:h-[400px] object-cover" />
                <h3 
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="text-xl font-bold text-secondary">
                  {category.name}
                </h3>
                <p
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="text-secondary">
                  {productCount} productos
                </p>
              </div>
            )
          })}
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
