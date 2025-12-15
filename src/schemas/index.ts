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
  image_url: z.string().nullable().transform((val) => val || ""),
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

export const CheckoutFormSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no debe tener más de 50 caracteres"),
  email: z.string()
    .email("Ingresa un correo electrónico válido")
    .min(1, "El correo electrónico es requerido"),
  phone: z.string()
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .regex(/^[0-9+\s()-]+$/, "El teléfono solo puede contener números y símbolos válidos"),
  tipoComprobante: z.enum(["boleta", "factura"]),
  dni: z.string().optional(),
  ruc: z.string().optional(),
  razonSocial: z.string().optional(),
}).refine((data) => {
  // Si es boleta, el DNI es obligatorio
  if (data.tipoComprobante === "boleta") {
    return data.dni && data.dni.length === 8 && /^\d+$/.test(data.dni);
  }
  return true;
}, {
  message: "El DNI debe tener 8 dígitos numéricos",
  path: ["dni"],
}).refine((data) => {
  // Si es factura, el RUC es obligatorio
  if (data.tipoComprobante === "factura") {
    return data.ruc && data.ruc.length === 11 && /^\d+$/.test(data.ruc);
  }
  return true;
}, {
  message: "El RUC debe tener 11 dígitos numéricos",
  path: ["ruc"],
}).refine((data) => {
  // Si es factura, la razón social es obligatoria
  if (data.tipoComprobante === "factura") {
    return data.razonSocial && data.razonSocial.length >= 2;
  }
  return true;
}, {
  message: "La razón social debe tener al menos 2 caracteres",
  path: ["razonSocial"],
})

export const LoginSchema = z.object({
  email: z.string()
    .email("Ingresa un correo electrónico válido")
    .min(1, "El correo electrónico es requerido"),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no debe tener más de 50 caracteres"),
})

export const CreateProductSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no debe tener más de 50 caracteres"),
  description: z.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no debe tener más de 500 caracteres"),
  price: z.number().positive().min(0.50, "El precio debe ser mayor a 0.50").max(100, "El precio no debe ser mayor a 100"),
  category_id: z.number(),
  is_available: z.boolean().default(true),
  image_url: z.string().nullable().transform((val) => val || ""),
}).refine((data) => {
  if (data.image_url) {
    return data.image_url.length > 0;
  }
  return true;
}, {
  message: "La imagen es requerida",
  path: ["image_url"],
})

export const CreateCategorySchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no debe tener más de 50 caracteres"),
  slug: z.string()
    .min(2, "El slug debe tener al menos 2 caracteres")
    .max(50, "El slug no debe tener más de 50 caracteres"),
  image_url: z.string().nullable().transform((val) => val || ""),
})

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;
export type CheckoutForm = z.infer<typeof CheckoutFormSchema>;
export type LoginForm = z.infer<typeof LoginSchema>;
export type CreateProductForm = z.infer<typeof CreateProductSchema>;
export type CreateCategoryForm = z.infer<typeof CreateCategorySchema>;