import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useNavigate } from "react-router-dom";
import generateSlug from "@/utils/generateSlug";

export default function AllProductsSection() {
  const { data: products, isLoading: isLoadingProducts, error: errorProducts } = useProducts();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const navigate = useNavigate();
  
  const isLoading = isLoadingProducts || isLoadingCategories;
  const error = errorProducts;

  return (
    <section className="max-w-7xl mx-auto py-20">
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl font-bold text-secondary">
            Cargando productos...
          </p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl font-bold text-red-600">
            Error al cargar productos: {error.message}
          </p>
        </div>
      )}

      {!isLoading && !error && (!products || products.length === 0) && (
        <div className="flex flex-col justify-center items-center py-20">
          <p className="text-2xl font-bold text-secondary mb-4">
            No hay productos disponibles
          </p>
          <p className="text-gray-600">
            Pronto agregaremos nuevos productos
          </p>
        </div>
      )}

      {!isLoading && !error && products && products.length > 0 && categories && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => {
            // Buscar la categoría correspondiente por category_id
            const category = categories.find(cat => cat.id === product.category_id);
            const categorySlug = category?.slug || '';
            
            return (
              <div
                key={product.id}
                onClick={() => {
                  if (categorySlug) {
                    navigate(`/productos/${categorySlug}/${generateSlug(product.name)}-${product.id}`)
                  }
                }}
                className="space-y-3 cursor-pointer"
              >
              <img 
                src={product.image_url} 
                alt={product.name}
                className="h-[250px] w-full md:h-[400px] object-cover" 
                data-aos="fade-up"
                data-aos-delay="100"
              />
              <h3
                className="text-xl font-bold text-secondary uppercase"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {product.name}
              </h3>
              <div className="flex justify-between items-center mx-1">
                <p
                  className="text-secondary"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {product.description}
                </p>
                <p
                  className="text-secondary font-bold"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  S/.{product.price}
                </p>
              </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
