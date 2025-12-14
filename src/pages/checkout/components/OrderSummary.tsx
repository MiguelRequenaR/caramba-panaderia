import { useCartStore } from "@/store/useCartStore";

export default function OrderSummary() {
  const { cart } = useCartStore();
  return (
    <section className="bg-[#f8f7ee] pt-20 md:pt-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold uppercase text-secondary text-center" data-aos="fade-up">
          Resumen de la orden
        </h2>
        <div className="mt-10 overflow-x-auto" data-aos="fade-up" data-aos-delay="100">
          <table className="min-w-full">
            <thead>
              <tr className="text-secondary">
                <th className="px-6 py-4 text-left font-bold uppercase">Producto</th>
                <th className="px-6 py-4 text-center font-bold uppercase">Cantidad</th>
                <th className="px-6 py-4 text-center font-bold uppercase">Precio</th>
                <th className="px-6 py-4 text-center font-bold uppercase">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-secondary">
                    Tu carrito está vacío.
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.id} className="border-t text-secondary">
                    <td className="px-6 py-4 text-lg font-bold">{item.name} <br /> <span className="text-sm text-secondary font-bold">{item.description}</span> <br /> <span className="text-sm text-secondary font-bold">Fecha: {item.deliveryDay} <br /> Hora: {item.deliveryTime}</span></td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-center">S/.{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">S/.{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            {cart.length > 0 && (
              <tfoot>
                <tr className="border-t text-secondary text-2xl">
                  <td className="px-6 py-4 font-bold text-right uppercase" colSpan={3}>
                    Total:
                  </td>
                  <td className="px-6 py-4 font-bold text-center text-secondary">
                    S/.{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </section>
  )
}
