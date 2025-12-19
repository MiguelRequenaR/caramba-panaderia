import type { ContactForm, CheckoutForm } from "@/schemas";
import type { CartItem } from "@/store/useCartStore";

/**
 * Envía un mensaje a WhatsApp con los datos del formulario
 * @param data - Datos validados del formulario de contacto
 * @param businessPhone - Número de WhatsApp del negocio 
 */

export const sendWhatsappMessage = (
  data: ContactForm,
  businessPhone: string = "51901617809"
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

/**
 * Envía un mensaje a WhatsApp con los datos del pedido de checkout
 * @param data - Datos validados del formulario de checkout
 * @param cart - Items del carrito con productos y detalles de entrega
 * @param total - Total del pedido
 * @param businessPhone - Número de WhatsApp del negocio 
 */

export const sendCheckoutWhatsappMessage = (
  data: CheckoutForm,
  cart: CartItem[],
  total: number,
  businessPhone: string = "51901617809"
): void => {
  let comprobanteInfo = "";
  if (data.tipoComprobante === "boleta") {
    comprobanteInfo = `*Tipo de Comprobante:* Boleta\n   *DNI:* ${data.dni}`;
  } else {
    comprobanteInfo = `*Tipo de Comprobante:* Factura\n   *RUC:* ${data.ruc}\n*Razón Social:* ${data.razonSocial}`;
  }

  // Formatear los productos del carrito
  const productosDetalle = cart.map((item) => {
    const deliveryInfo = item.deliveryDay && item.deliveryTime
      ? `\n   Entrega: ${formatDeliveryDate(item.deliveryDay)}\n   Horario: ${formatDeliveryTime(item.deliveryTime)}`
      : "";

    return `• *${item.name}*\n   Cantidad: ${item.quantity}\n   Precio unitario: S/.${item.price.toFixed(2)}\n   Subtotal: S/.${(item.price * item.quantity).toFixed(2)}${deliveryInfo}`;
  }).join("\n\n");

  const messageText = `
 *NUEVO PEDIDO - PANADERÍA*

 *DATOS DEL CLIENTE*
  *Nombre:* ${data.name}
  *Email:* ${data.email}
  *Teléfono:* ${data.phone}

  *INFORMACIÓN DE FACTURACIÓN*
  ${comprobanteInfo}

  *PRODUCTOS*
  ${productosDetalle}

  *TOTAL: S/.${total.toFixed(2)}*
  `.trim();

  const url = `https://wa.me/${businessPhone}?text=${encodeURIComponent(messageText)}`;
  window.open(url, '_blank');
}


const formatDeliveryDate = (date: string): string => {
  const dateObj = new Date(date + 'T00:00:00');
  return dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}


const formatDeliveryTime = (time: string): string => {
  if (time === "09am-1pm") return "09:00 AM - 1:00 PM";
  if (time === "1pm-8pm") return "1:00 PM - 8:00 PM";
  return time;
}