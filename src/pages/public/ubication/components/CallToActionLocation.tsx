import { MapPin } from "lucide-react";


export default function CallToActionLocation() {
  return (
    <section
    className="bg-primary text-secondary py-20">
      <div
      className="flex flex-col items-center justify-center space-y-5">
        <h3
        className="text-2xl font-bold uppercase text-center"
        data-aos="fade-up"
        data-aos-delay="100">
          Visítanos en nuestras tiendas
        </h3>
        <p
        className="text-secondary text-lg text-center"
        data-aos="fade-up"
        data-aos-delay="200">
          Caramba Panadería y Pastelería te espera todos los días.
        </p>
        <a
          href="https://www.google.com/maps/place/Barranco,+Lima,+Peru" 
          className="
            relative overflow-hidden bg-secondary px-5 py-2 uppercase cursor-pointer border border-secondary group transition-colors duration-500 flex items-center gap-2 justify-center
          "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <span
            className="
              absolute inset-0 
              bg-white
              translate-y-full
              group-hover:translate-y-0
              transition-transform duration-500 ease-in-out pointer-events-none
            "
          />
          <span
            className="relative z-10 transition-colors duration-500 text-white group-hover:text-secondary font-bold flex items-center gap-2"
          >
            <MapPin />
            Ir a Caramba Panadería y Pastelería
          </span>
        </a>
      </div>
    </section>
  )
}
