import { useProductsByCategory } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
}

export default function ProductCard({ categoryId, categoryName, categorySlug }: ProductCardProps) {

  const { data: products, isLoading, error } = useProductsByCategory(categoryId);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-2xl font-bold text-secondary">
          Cargando productos...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-2xl font-bold text-red-600">
          Error al cargar productos: {error.message}
        </p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <p className="text-2xl font-bold text-secondary mb-4">
          No hay productos disponibles en esta categoría
        </p>
        <p className="text-gray-600">
          Pronto agregaremos nuevos productos
        </p>
      </div>
    );
  }

  return (
    <main
    className="py-20">
      <h2
        className="text-center text-3xl font-bold uppercase text-secondary mb-10">{categoryName}</h2>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products?.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/productos/${categorySlug}/${product.id}`)}
            className="space-y-3 cursor-pointer">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="h-[250px] w-full md:h-[400px] object-cover" />
            <h3
              className="text-xl font-bold text-secondary uppercase">{product.name}</h3>
            <div
              className="flex justify-between items-center mx-1">
              <p
                className="text-secondary">{product.description}</p>
              <p
                className="text-secondary font-bold">S/.{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
