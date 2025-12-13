import storeAndHistoryImage from "@/assets/StoreAndHistorySection3.png";
import storeAndHistoryImage2 from "@/assets/StoreAndHistorySection1.png";

export default function AboutSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        <div className="space-y-5 w-full md:w-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-bold uppercase text-secondary text-center md:text-left">
            Nuestra Trayectoria
          </h2>
          <p className="text-secondary mx-4 md:mx-0">
            Apasionados y detallistas, amantes de la cocina y la pastelería.
            <br />
            <br />
            Hace más de una década, abrimos nuestras puertas en el corazón de Barranco con un sueño claro: celebrar la tradición panadera peruana y, a la vez, experimentar con sabores que nos conectan con la infancia y la modernidad limeña.
            <br />
            <br />
            Familia, amigos y vecinos han sido la inspiración constante de nuestro trabajo diario. Nuestros panes, bizcochos y dulces llevan el tiempo, el cariño y las historias de quienes se animan a probarlos y compartirlos.
          </p>
        </div>
        <img
          src={storeAndHistoryImage}
          alt="Caramba Panadería y Pastelería"
          className="md:w-[500px] md:h-[500px]"
          data-aos="fade-right"
          data-aos-delay="100"
        />
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-20 pt-20">
        <img
          src={storeAndHistoryImage2}
          alt=""
          className="md:w-[500px] md:h-[500px]"
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <div className="space-y-5 w-full md:w-auto"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-2xl font-bold uppercase text-secondary text-center md:text-left">
            ¿Qué hace tan especial a Caramba Panadería y Pastelería?
          </h2>
          <ul
            className="list-disc list-inside text-secondary mx-4 md:mx-0">
            <li>
              Panes y pasteles artesanales, horneados a diario utilizando recetas que respetan nuestro legado y productos locales.
            </li>
            <li>
              Un espacio donde celebrar la cultura barranquina, apoyar a artistas locales y abrir la puerta a nuevas amistades.
            </li>
            <li>
              Un compromiso honesto con la calidad: desde el primer café de la mañana hasta el último postre de la tarde.
            </li>
          </ul>
          <div className="flex items-center mt-6 space-x-4 mx-4 md:mx-0">
            <div className="h-12 border-l-4 border-secondary mr-4"></div>
            <span className="italic text-secondary text-left">
              “Venir a Caramba Panadería y Pastelería es regresar a casa, sentarse a la mesa y sentir el abrazo de un buen pan.”
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
