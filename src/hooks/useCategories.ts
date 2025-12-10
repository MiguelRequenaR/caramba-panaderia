import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Category } from "@/schemas";

const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      product_count:products(count)
    `)
    .order("name");
  
  if (error) {
    throw new Error(error.message);
  }

  const categoriesWithCount = data?.map(category => ({
    ...category,
    product_count: category.product_count?.[0]?.count || 0
  })) || [];

  return categoriesWithCount;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, 
  })
}
