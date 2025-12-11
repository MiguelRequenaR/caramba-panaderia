import type { ContactForm } from "@/schemas";

/**
 * Envía un mensaje a WhatsApp con los datos del formulario
 * @param data - Datos validados del formulario de contacto
 * @param businessPhone - Número de WhatsApp del negocio 
 */

export const sendWhatsappMessage = (
  data: ContactForm,
  businessPhone: string = "51901119500"
): void => {
  const messageText = `
  *Nuevo mensaje:*

  *Nombre:* ${data.name}
  *Email:* ${data.email}
  *Teléfono:* ${data.phone}
  *Mensaje:*${data.message}
  `.trim();

  const url = `https://wa.me/${businessPhone}?text=${encodeURIComponent(messageText)}`;
  window.open(url, '_blank');
}