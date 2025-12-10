import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
    className="bg-secondary text-white">
      <div
      className="mx-20 py-20">
        <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-5">
            <h1 className="text-2xl font-bold uppercase text-center md:text-left">
              Caramba Panadería y <span className="hidden md:inline"><br /></span> Pastelería
            </h1>
            <p className="text-center md:text-left">
              Caramba Panadería y Pastelería es una
              <span className="hidden md:inline"><br /></span>empresa que se dedica a la fabricación y
              <span className="hidden md:inline"><br /></span>venta de pan y pasteles.
            </p>
            <div
            className="space-y-2">
              <p className="text-center md:text-left">
                Siguenos en nuestras redes sociales:
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Facebook />
                <Instagram />
                <Twitter />
              </div>
            </div>
          </div>
          <div
            className="text-center md:text-left">
            <h2
            className="text-2xl font-bold uppercase">
              Enlaces</h2>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/productos">Productos</Link>
              </li>
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link to="/ubicacion">Ubicación</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <div
          className="text-center md:text-left">
            <h2
            className="text-2xl font-bold uppercase">
              Información</h2>
            <ul>
              <li>
                Política de Cambios y Devoluciones
              </li>
              <li>
                Política de Privacidad
              </li>
              <li>
                Terminos y Condiciones
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-10"/>
        <div
        className="text-center">
          Desarrollado por <a href="https://www.groblestudio.com/" target="_blank" rel="noopener noreferrer" className="text-black font-bold">Grobles Studio.</a>
        </div>
      </div>
    </footer>
  )
}
