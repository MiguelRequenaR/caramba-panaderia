import { useProductsByCategory } from "@/hooks/useProducts";

interface ProductCardProps {
  categoryId: number;
  categoryName: string;
}

export default function ProductCard({ categoryId, categoryName }: ProductCardProps) {

  const { data: products, isLoading, error } = useProductsByCategory(categoryId);

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
    <main>
      <h2>{categoryName}</h2>
      {products?.map((product) => (
        <div key={product.id}>
          <img src={product.image_url} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </main>
  )
}
