import { useState } from "react"
import { CheckoutFormSchema, type CheckoutForm } from "@/schemas";
import { useCartStore } from "@/store/useCartStore";
import { sendCheckoutWhatsappMessage } from "@/utils/whatsapp";
import { toast } from "react-toastify";

export default function FormCheckout() {
  const { cart, total, clearCart } = useCartStore();
  
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    tipoComprobante: "boleta",
    dni: "",
    ruc: "",
    razonSocial: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // tipoComprobante puede cambiar qué campos se muestran, así que limpiamos relacionados
    if (name === "tipoComprobante") {
      setFormData((prev) => ({
        ...prev,
        tipoComprobante: value as "boleta" | "factura",
        dni: "",
        ruc: "",
        razonSocial: "",
      }));
      setErrors((prev) => ({
        ...prev,
        dni: undefined,
        ruc: undefined,
        razonSocial: undefined,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Verificar que hay productos en el carrito
    if (cart.length === 0) {
      toast.error("No hay productos en el carrito");
      return;
    }

    const result = CheckoutFormSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof CheckoutForm;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    // Enviar mensaje de WhatsApp con los datos del pedido
    sendCheckoutWhatsappMessage(result.data, cart, total);
    
    // Limpiar el carrito y el formulario
    toast.success("¡Pedido enviado! Serás redirigido a WhatsApp");
    
    setTimeout(() => {
      clearCart();
      setFormData({
        name: "",
        email: "",
        phone: "",
        tipoComprobante: "boleta",
        dni: "",
        ruc: "",
        razonSocial: "",
      });
    }, 1000);
  };

  return (
    <section className="bg-[#f8f7ee]">
      <div className="max-w-7xl mx-auto px-4">
        <h4 className="text-center text-2xl font-bold uppercase text-secondary">
          Datos de facturación:
        </h4>
        <form className="mt-8 max-w-2xl mx-auto space-y-6 pb-20" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="font-semibold text-secondary mb-1">Nombre y Apellido</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`border ${errors.name ? "border-red-500" : "border-secondary"} rounded-md px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-secondary`}
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="font-semibold text-secondary mb-1">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`border ${errors.email ? "border-red-500" : "border-secondary"} rounded-md px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-secondary`}
                placeholder="Ej: correo@ejemplo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="md:col-span-2 flex flex-col space-y-1">
              <label htmlFor="phone" className="font-semibold text-secondary mb-1">Teléfono</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full border ${errors.phone ? "border-red-500" : "border-secondary"} rounded-md px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-secondary`}
                placeholder="Ej: 912345678"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div className="md:col-span-2 flex flex-col space-y-3">
              <label className="font-semibold text-secondary mb-1">
                Tipo de Comprobante
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipoComprobante"
                    value="boleta"
                    checked={formData.tipoComprobante === 'boleta'}
                    onChange={handleChange}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                  />
                  <span className="text-secondary">Boleta</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipoComprobante"
                    value="factura"
                    checked={formData.tipoComprobante === 'factura'}
                    onChange={handleChange}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                  />
                  <span className="text-secondary">Factura</span>
                </label>
              </div>
              {errors.tipoComprobante && (
                <p className="text-red-500 text-sm">{errors.tipoComprobante}</p>
              )}
              {formData.tipoComprobante === 'boleta' && (
                <div className="flex flex-col space-y-1">
                  <label htmlFor="dni" className="font-semibold text-secondary mb-1">
                    DNI
                  </label>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    maxLength={8}
                    required
                    value={formData.dni}
                    onChange={handleChange}
                    className={`border ${errors.dni ? "border-red-500" : "border-secondary"} rounded-md px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-secondary`}
                    placeholder="Ej: 12345678"
                  />
                  {errors.dni && (
                    <p className="text-red-500 text-sm">{errors.dni}</p>
                  )}
                </div>
              )}
              {formData.tipoComprobante === 'factura' && (
                <>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="ruc" className="font-semibold text-secondary mb-1">
                      RUC
                    </label>
                    <input
                      id="ruc"
                      name="ruc"
                      type="text"
                      maxLength={11}
                      required
                      value={formData.ruc}
                      onChange={handleChange}
                      className={`border ${errors.ruc ? "border-red-500" : "border-secondary"} rounded-md px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-secondary`}
                      placeholder="Ej: 20123456789"
                    />
                    {errors.ruc && (
                      <p className="text-red-500 text-sm">{errors.ruc}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="razonSocial" className="font-semibold text-secondary mb-1">
                      Razón Social
                    </label>
                    <input
                      id="razonSocial"
                      name="razonSocial"
                      type="text"
                      required
                      value={formData.razonSocial}
                      onChange={handleChange}
                      className={`border ${errors.razonSocial ? "border-red-500" : "border-secondary"} rounded-md px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-secondary`}
                      placeholder="Ej: Empresa S.A.C."
                    />
                    {errors.razonSocial && (
                      <p className="text-red-500 text-sm">{errors.razonSocial}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary text-white rounded-full cursor-pointer font-bold px-8 py-3 uppercase tracking-wide transition-colors"
            >
              Finalizar compra
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
