import { Link } from "react-router-dom";
import storeAndHistoryImage from "@/assets/StoreAndHistorySection1.png";
import storeAndHistoryImage2 from "@/assets/StoreAndHistorySection2.png";

export default function StoreAndHistorySection() {
  return (
    <section className="bg-[#fdfdfd] py-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        <img
          src={storeAndHistoryImage}
          alt="Panadería"
          className="md:w-[500px] md:h-[500px]"
          data-aos="fade-right"
          data-aos-delay="100"
        />
        <div className="space-y-5 w-full md:w-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-bold uppercase text-secondary text-center">
            Panadería <br /> te espera todos los días
          </h2>
          <p className="text-secondary text-center font-bold">
            Conoce nuestras un poco más sobre nuestras tiendas
          </p>
          <div className="flex justify-center">
            <Link to="/ubicacion"
              className="relative overflow-hidden bg-secondary px-5 py-2 uppercase cursor-pointer border border-secondary group transition-colors duration-500">
              <span
                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"
              />
              <span
                className="relative z-10 transition-colors duration-500 text-white group-hover:text-secondary font-bold"
              >
                Conoce más
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-20 pt-20">
        <div className="space-y-5 w-full md:w-auto"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-2xl font-bold uppercase text-secondary text-center">
            Nuestra Historia
          </h2>
          <p className="text-secondary text-center font-bold mx-4 md:mx-0">
            Sientate a disfrutar un poco más que solo cocina, sientate y
            <span className="hidden md:inline"> <br /> </span>
            <span className="inline md:hidden"> </span>
            conoce la historia de Panadería
          </p>
          <div className="flex justify-center">
            <Link to="/nosotros"
              className="relative overflow-hidden bg-secondary px-5 py-2 uppercase cursor-pointer border border-secondary group transition-colors duration-500">
              <span
                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none"
              />
              <span
                className="relative z-10 transition-colors duration-500 text-white group-hover:text-secondary font-bold"
              >
                Conoce más
              </span>
            </Link>
          </div>
        </div>
        <img
          src={storeAndHistoryImage2}
          alt=""
          className="md:w-[500px] md:h-[500px]"
          data-aos="fade-up"
          data-aos-delay="200"
        />
      </div>
    </section>
  )
}
