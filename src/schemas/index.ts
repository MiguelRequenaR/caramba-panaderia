import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image_url: z.string().nullable().transform((val) => val || ""),
  product_count: z.number().optional().default(0),
})

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive(),
  image_url: z.string().nullable(),
  description: z.string().nullable(),
  is_available: z.boolean().default(true),
  category_id: z.number(),
  categories: z.array(CategorySchema).nullable(),
})

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;