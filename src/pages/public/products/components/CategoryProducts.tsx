import { useParams, useNavigate } from "react-router-dom"
import { useCategories } from "@/hooks/useCategories"
import ProductCard from "@/components/ProductCard"
import Button from "@/components/Button"

export default function CategoryProducts() {

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: categories, isLoading: isLoadingCategories, error } = useCategories();

  // Validar que slug existe
  if (!slug) {
    return (
      <div className="min-h-screen bg-[#f8f7ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">Slug no proporcionado</p>
          <Button onClick={() => navigate("/productos")}>
            Volver a categorías
          </Button>
        </div>
      </div>
    );
  }

  // Mostrar error si hay un problema al cargar
  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f7ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">
            Error al cargar categorías: {error.message}
          </p>
          <Button onClick={() => navigate("/productos")}>
            Volver a categorías
          </Button>
        </div>
      </div>
    );
  }

  const category = categories?.find((category) => category.slug === slug);

  // Si está cargando o no se encontró la categoría, mostrar el layout con mensaje de carga
  if (isLoadingCategories || !category) {
    return (
      <main className="bg-[#f8f7ee] min-h-screen pt-10 md:pt-40">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Button onClick={() => navigate("/productos")} className="mb-6">
            ← Volver a categorías
          </Button>
          <div className="flex justify-center items-center py-20">
            <p className="text-2xl font-bold text-secondary">
              Cargando productos...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f8f7ee] min-h-screen pt-10 md:pt-40">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Button onClick={() => navigate("/productos")} className="mb-6" data-aos="zoom-in">
          ← Volver a categorías
        </Button>
        <ProductCard categoryId={category.id} categoryName={category.name} categorySlug={category.slug}/>
      </div>
    </main>
  )
}
