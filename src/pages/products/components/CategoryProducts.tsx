import { useParams, useNavigate } from "react-router-dom"
import { useCategories } from "@/hooks/useCategories"
import ProductCard from "@/components/ProductCard"
import Button from "@/components/Button"

export default function CategoryProducts() {

  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { data: categories } = useCategories();

  const category = categories?.find((category) => category.id === Number(categoryId));

  if (!category) {
    return (
      <div className="min-h-screen bg-[#f8f7ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">Categoría no encontrada</p>
          <Button onClick={() => navigate("/productos")}>
            Volver a categorías
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#f8f7ee] min-h-screen pt-10 md:pt-40">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Button onClick={() => navigate("/productos")} className="mb-6">
          ← Volver a categorías
        </Button>
        <ProductCard categoryId={category.id} categoryName={category.name} />
      </div>
    </main>
  )
}
