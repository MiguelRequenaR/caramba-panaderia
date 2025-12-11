import FormContact from "./components/FormContact";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <main
    className="bg-[#f8f7ee] pt-20 md:pt-50">
      <h1
        className="text-3xl font-bold uppercase text-secondary text-center">
        Contacto
      </h1>
      <p
        className="text-secondary text-center text-lg font-bold">
        Contactanos para cualquier consulta
      </p>
      <div className="max-w-2xl mx-auto space-y-4 py-10 text-center">
        <div
          className="flex items-center gap-2 text-secondary justify-center"
        >
          <Mail className="text-secondary" />
          Email: <a href="mailto:info@carambapanaderia.com">info@carambapanaderia.com</a>
        </div>
        <div
          className="flex items-center gap-2 text-secondary justify-center"
        >
          <Phone className="text-secondary" />
          Teléfono: <a href="tel:+51901119500">+51 901 119 500</a>
        </div>
      </div>
      <FormContact /> 
    </main>
  )
}
