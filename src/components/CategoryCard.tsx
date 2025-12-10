import type { Category } from "@/schemas";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {

  const productCount = category.product_count || 0;
  return (
    <div
      className="space-y-3 mx-6">
      <img src={category.image_url} alt={category.name}
        className="h-[250px] w-full md:h-[400px] object-cover" />
      <h3 className="text-xl font-bold text-secondary">
        {category.name}
      </h3>
      <p
      className="text-secondary">
        {productCount} productos
      </p>
    </div>
  )
}
