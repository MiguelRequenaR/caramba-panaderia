
export default function StoreLocation() {
  return (
    <main
    className="py-20 bg-[#f8f7ee]">
      <div
      className="max-w-7xl mx-auto">
        <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
          className="flex flex-col items-center justify-center space-y-5"
          data-aos="fade-right"
          data-aos-delay="100">
            <h3
              className="text-4xl font-bold uppercase text-secondary text-center">
              Tienda
            </h3>
            <p
              className="text-secondary text-lg text-center md:text-left">
              Panadería y Pastelería con una gran variedad de productos para ti, panes, pasteles, desayunos, postres, bebidas frías y calientes.
            </p>
            <p
              className="text-secondary text-lg text-center md:text-left w-full">
              Haz tu pedido desde casa o visítanos en nuestro local de: <br />
              8:00 AM a 10:00 PM
            </p>
          </div>
          <div
          className="mx-4 md:mx-0"
          data-aos="fade-up"
          data-aos-delay="200">
            <img src="https://images.unsplash.com/photo-1643944471768-2d2eac3afb6d?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Caramba Panadería y Pastelería" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
        <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-30">
          <div
          className="mx-4 md:mx-0"
          data-aos="fade-right"
          data-aos-delay="300">
            <img src="https://images.unsplash.com/photo-1586812314139-d1b0ca32cbab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Caramba Panadería y Pastelería" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div
          className="flex flex-col items-center justify-center space-y-5"
          data-aos="fade-up"
          data-aos-delay="400">
            <h3
              className="text-4xl font-bold uppercase text-secondary text-center">
              Comedor
            </h3>
            <p
              className="text-secondary text-lg text-center md:text-left">
              Contamos con un amplio espacio para que puedas disfrutar de almuerzos, cenas y postres artesanales.
            </p>
            <p
              className="text-secondary text-lg text-center md:text-left w-full">
              Visitanos de: <br />
              8:00 AM a 10:00 PM en nuestro local.
            </p>
            <p
              className="text-secondary text-lg text-center md:text-left w-full">
              Caramba Panadería y Pastelería te espera todos los días.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
