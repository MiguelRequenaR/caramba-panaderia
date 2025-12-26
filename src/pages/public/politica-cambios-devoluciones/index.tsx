export default function PoliticaCambiosDevoluciones() {
  return (
    <main
      className="bg-[#fdfdfd] pt-20 md:pt-50 min-h-screen"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1
          className="text-3xl font-bold uppercase text-secondary text-center mb-4"
        >
          Politica de Cambios y Devoluciones
        </h1>
        <div className="space-y-6 text-secondary">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Plazo para Cambios y Devoluciones</h2>
            <p className="text-base leading-relaxed">
              Los clientes tienen un plazo de 24 horas desde la fecha de compra para solicitar cambios o devoluciones de productos. 
              Pasado este plazo, no se aceptarán solicitudes de cambio o devolución.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Condiciones para Cambios</h2>
            <p className="text-base leading-relaxed mb-2">
              Los cambios están sujetos a las siguientes condiciones:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El producto debe estar en su estado original, sin consumir y en perfectas condiciones.</li>
              <li>Se debe presentar el comprobante de compra original.</li>
              <li>El cambio está sujeto a disponibilidad de stock del producto deseado.</li>
              <li>Si el nuevo producto tiene un precio mayor, el cliente deberá pagar la diferencia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Condiciones para Devoluciones</h2>
            <p className="text-base leading-relaxed mb-2">
              Las devoluciones están sujetas a las siguientes condiciones:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El producto debe estar en su estado original, sin consumir y en perfectas condiciones.</li>
              <li>Se debe presentar el comprobante de compra original.</li>
              <li>El reembolso se realizará mediante el mismo método de pago utilizado en la compra original.</li>
              <li>El proceso de reembolso puede tardar entre 5 a 10 días hábiles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Productos No Elegibles</h2>
            <p className="text-base leading-relaxed mb-2">
              No se aceptan cambios o devoluciones en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Productos personalizados o hechos a pedido.</li>
              <li>Productos que hayan sido consumidos parcial o totalmente.</li>
              <li>Productos que hayan sido manipulados o dañados por el cliente.</li>
              <li>Productos perecederos que hayan pasado su fecha de vencimiento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Proceso de Solicitud</h2>
            <p className="text-base leading-relaxed">
              Para solicitar un cambio o devolución, el cliente debe contactarnos a través de nuestros canales de atención 
              al cliente (teléfono, email o en nuestra tienda física) dentro del plazo establecido, proporcionando el 
              comprobante de compra y una descripción del motivo de la solicitud.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Contacto</h2>
            <p className="text-base leading-relaxed">
              Para más información sobre nuestra política de cambios y devoluciones, puede contactarnos a través de 
              nuestros canales de atención al cliente o visitarnos en nuestra tienda física.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

