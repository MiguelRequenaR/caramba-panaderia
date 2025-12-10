import Button from "@/components/Button";
import storeAndHistoryImage from "@/assets/StoreAndHistorySection1.webp";
import storeAndHistoryImage2 from "@/assets/StoreAndHistorySection2.webp";

export default function StoreAndHistorySection() {
  return (
    <main className="bg-[#f8f7ee] py-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        <img
          src={storeAndHistoryImage}
          alt="Caramba Panadería y Pastelería"
          className="w-full max-w-xs md:max-w-full md:w-auto mb-6 md:mb-0"
          data-aos="fade-right"
          data-aos-delay="100"
        />
        <div className="space-y-5 w-full md:w-auto"
        data-aos="fade-up"
        data-aos-delay="200"
        >
          <h2 className="text-2xl font-bold uppercase text-secondary text-center">
            Caramba Panadería y Pastelería <br /> te espera todos los días
          </h2>
          <p className="text-secondary text-center font-bold">
            Conoce nuestras un poco más sobre nuestras tiendas
          </p>
          <div className="flex justify-center">
            <Button>
              Conoce más
            </Button>
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
            conoce la historia de Caramba Panadería y Pastelería
          </p>
          <div className="flex justify-center">
            <Button>
              Conoce más
            </Button>
          </div>
        </div>
        <img
          src={storeAndHistoryImage2}
          alt=""
          className="w-full max-w-xs md:max-w-full md:w-auto mb-6 md:mb-0"
          data-aos="fade-up"
          data-aos-delay="200"
        />
      </div>
    </main>
  )
}
