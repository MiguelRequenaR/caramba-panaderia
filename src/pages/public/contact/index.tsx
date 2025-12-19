import FormContact from "./components/FormContact";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <main
    className="bg-[#f8f7ee] pt-20 md:pt-50">
      <h2
        className="text-3xl font-bold uppercase text-secondary text-center" data-aos="fade-up" data-aos-delay="100">
        Contacto
      </h2>
      <p
        className="text-secondary text-center text-lg font-bold" data-aos="fade-up" data-aos-delay="200">
        Contactanos para cualquier consulta
      </p>
      <div className="max-w-2xl mx-auto space-y-4 py-10 text-center" data-aos="fade-up" data-aos-delay="300">
        <div
          className="flex items-center gap-2 text-secondary justify-center"
        >
          <Mail className="text-secondary" />
          Email: <a href="mailto:info@panaderia.com">info@panaderia.com</a>
        </div>
        <div
          className="flex items-center gap-2 text-secondary justify-center"
        >
          <Phone className="text-secondary" />
          Teléfono: <a href="tel:+51901617809">+51 901 617 809</a>
        </div>
      </div>
      <FormContact /> 
    </main>
  )
}
