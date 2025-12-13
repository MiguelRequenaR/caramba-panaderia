import Button from "@/components/Button";
import { useState, type FormEvent } from "react";
import { sendWhatsappMessage } from "@/utils/whatsapp";
import { ContactFormSchema, type ContactForm } from "@/schemas";

export default function FormContact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = ContactFormSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    sendWhatsappMessage(result.data);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    alert("¡Mensaje enviado! Serás redirigido a WhatsApp.");
  };

  return (
    <section className="flex flex-col items-center justify-center px-4" data-aos="fade-up" data-aos-delay="100">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="font-semibold text-secondary mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`border ${
                errors.name ? "border-red-500" : "border-secondary"
              } text-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary transition`}
              placeholder="Nombre"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-semibold text-secondary mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className={`border ${
                errors.email ? "border-red-500" : "border-secondary"
              } text-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary transition`}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="phone" className="font-semibold text-secondary mb-1">
            Número de Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+51 901 119 500"
            className={`border ${
              errors.phone ? "border-red-500" : "border-secondary"
            } text-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary transition`}
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="message" className="font-semibold text-secondary mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            rows={5}
            className={`border ${
              errors.message ? "border-red-500" : "border-secondary"
            } text-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary transition resize-none`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <Button type="submit">Enviar mensaje por WhatsApp</Button>
        </div>
      </form>
    </section>
  );
}