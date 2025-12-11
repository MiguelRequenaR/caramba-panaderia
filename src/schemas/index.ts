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

export const ContactFormSchema = z.object({
  name: z.string()
    .min(2, "El nombre es debe tener al menos 2 caracteres")
    .max(50, "El nombre no debe tener más de 50 caracteres"),
  email: z.string()
    .email("Ingresa un correo electrónico válido")
    .min(1, "El correo electrónico es requerido"),
  phone: z.string()
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .regex(/^[0-9+\s()-]+$/, "El teléfono solo puede contener números y símbolos válidos"),
  message: z.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje no debe tener más de 500 caracteres"),
})

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;