export default function PoliticaPrivacidad() {
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
          Politica de Privacidad
        </h1>
        <div className="space-y-6 text-secondary">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Información que Recopilamos</h2>
            <p className="text-base leading-relaxed mb-2">
              Recopilamos información que usted nos proporciona directamente, incluyendo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nombre completo y datos de contacto (email, teléfono, dirección)</li>
              <li>Información de pago (métodos de pago, datos de facturación)</li>
              <li>Información de pedidos y preferencias de compra</li>
              <li>Comunicaciones que mantiene con nosotros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Uso de la Información</h2>
            <p className="text-base leading-relaxed mb-2">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Procesar y gestionar sus pedidos</li>
              <li>Comunicarnos con usted sobre su cuenta y pedidos</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Enviar información promocional (con su consentimiento)</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Protección de Datos</h2>
            <p className="text-base leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal 
              contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión 
              por Internet o almacenamiento electrónico es 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Compartir Información</h2>
            <p className="text-base leading-relaxed mb-2">
              No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio (procesadores de pago, servicios de envío)</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos legales</li>
              <li>Con su consentimiento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Sus Derechos</h2>
            <p className="text-base leading-relaxed mb-2">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acceder a su información personal</li>
              <li>Rectificar información incorrecta o incompleta</li>
              <li>Solicitar la eliminación de sus datos personales</li>
              <li>Oponerse al procesamiento de sus datos personales</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Cookies</h2>
            <p className="text-base leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, analizar el tráfico 
              y personalizar el contenido. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar 
              algunas funcionalidades del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Cambios a esta Política</h2>
            <p className="text-base leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos 
              sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "última 
              actualización".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Contacto</h2>
            <p className="text-base leading-relaxed">
              Si tiene preguntas o inquietudes sobre esta política de privacidad o sobre cómo manejamos su información personal, 
              puede contactarnos a través de nuestros canales de atención al cliente.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

