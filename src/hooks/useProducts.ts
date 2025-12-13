import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/schemas";

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_available", true)
    .order("name");
  
  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

const fetchProductById = async (productId: number): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("is_available", true)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })
}

export const useProductsByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  })
}

export const useProductById = (productId: number) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  })
}