import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProductById } from "@/hooks/useProducts"
import { useCartStore } from "@/store/useCartStore"
import Button from "@/components/Button"
import { toast } from "react-toastify"

export default function ProductDetail() {
  const { slug, productId } = useParams<{ slug: string, productId: string }>();
  const actualId = productId?.split('-').pop();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProductById(Number(actualId));
  const { addToCart } = useCartStore();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const whatsappNumber = "51901617809";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola, quiero conocer la disponibilidad del producto ${product?.name}`;

  const timeSlots = [
    {
      value: "09am-1pm",
      label: "09:00 AM - 1:00 PM",
    },
    {
      value: "1pm-8pm",
      label: "1:00 PM - 8:00 PM",
    }
  ];

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDay(e.target.value);
    setSelectedTime("");
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = () => {
    if (!selectedDay || !selectedTime) {
      toast.error("Por favor, selecciona una fecha y hora de entrega.")
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product!, selectedDay, selectedTime);
    }

    toast.success(`Se agregaron ${quantity} unidades a tu carrito.`)
    
    setQuantity(1);
  }

  if (!productId) {
    return (
      <div className="min-h-screen bg-[#f8f7ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">Producto no encontrado</p>
          <Button onClick={() => navigate("/productos")}>
            Volver a productos
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-[#f8f7ee]">
        <p className="text-2xl font-bold text-secondary">
          Cargando producto...
        </p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f8f7ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">
            {error ? `Error: ${error.message}` : "Producto no encontrado"}
          </p>
          <Button onClick={() => navigate("/productos")}>
            Volver a productos
          </Button>
        </div>
      </div>
    );
  }

  const handleBackToCategory = () => {
    if (slug) {
      navigate(`/productos/${slug}`);
    } else {
      navigate("/productos");
    }
  }

  return (
    <main
      className="pt-20 md:pt-50 bg-[#f8f7ee]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 mx-4 md:mx-0">
          <Button onClick={handleBackToCategory} data-aos="zoom-in">
            ← Volver
          </Button>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:py-10 mx-4 md:mx-0">
          <div
            className="flex justify-center">
            <img src={product.image_url} alt={product.name} className="w-[400px] md:h-[650px] object-cover" data-aos="fade-up" data-aos-delay="100" />
          </div>
          <div
            className="space-y-5" data-aos="fade-up" data-aos-delay="200">
            <h2
              className="text-4xl font-bold uppercase text-secondary">
              {product.name}
            </h2>
            <p
              className="text-2xl font-bold text-secondary">
              S/.{product.price}
            </p>
            <p
              className="text-secondary">
              {product.description}
            </p>
            <p
              className="italic font-bold text-secondary/80">
              Este producto tiene un tiempo de preparación. Para confirmar la disponibilidad del día, por favor consulta a nuestro WhatsApp.
            </p>
            <div className="flex justify-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-secondary px-3 py-2 uppercase cursor-pointer border border-secondary group transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"></span>
                <span
                  className="relative z-10 transition-colors duration-500 text-white group-hover:text-secondary font-bold">
                  Consultar por WhatsApp
                </span>
              </a>
            </div>

            <div className="space-y-2">
              <label htmlFor="delivery-day" className="block text-secondary font-bold">
                Día de Entrega:
              </label>
              <input
                id="delivery-day"
                type="date"
                value={selectedDay || ""}
                onChange={handleDateChange}
                min={getMinDate()}
                className="block max-w-full w-full px-4 py-2 border border-secondary/30 focus:outline-none focus:border-secondary text-secondary box-border"
                style={{ maxWidth: '100%' }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="delivery-time" className="block text-secondary font-bold">
                Horario de Entrega:
              </label>
              <select
                id="delivery-time"
                value={selectedTime || ""}
                onChange={handleTimeChange}
                disabled={!selectedDay}
                className={`w-full px-4 py-2 border border-secondary/30 focus:outline-none focus:border-secondary text-secondary ${!selectedDay ? 'bg-gray-200 cursor-not-allowed' : 'bg-white cursor-pointer'
                  }`}
              >
                <option value="">Selecciona un horario</option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
              {!selectedDay && (
                <p className="text-sm text-gray-500 italic">
                  Primero selecciona un día
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-secondary font-bold">
                Cantidad:
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  className={`px-4 py-2 border border-secondary/30 font-bold text-secondary rounded-full ${quantity <= 1
                      ? 'bg-gray-200 cursor-not-allowed opacity-50'
                      : 'bg-white hover:bg-secondary/10 cursor-pointer'
                    }`}
                >
                  -
                </button>
                <span className="text-xl font-bold text-secondary min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="px-4 py-2 border border-secondary/30 bg-white hover:bg-secondary/10 font-bold text-secondary cursor-pointer rounded-full"
                >
                  +
                </button>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedDay || !selectedTime}
                className={`bg-secondary w-fit text-lg px-4 rounded-full text-white uppercase cursor-pointer py-2 ${!selectedDay || !selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Agregar al carrito
              </button>
              {(!selectedDay || !selectedTime) && (
                <p className="text-sm text-gray-500 italic mt-2">
                  Por favor selecciona un día y un horario para agregar al carrito
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
