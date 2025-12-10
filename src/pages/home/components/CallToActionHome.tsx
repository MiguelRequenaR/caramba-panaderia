
export default function CallToActionHome() {
  return (
    <main
    className="flex flex-col items-center justify-center py-10 bg-primary text-secondary space-y-5">
      <h2
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-xl md:text-3xl font-bold uppercase text-center">
        Explora todos nuestros productos
      </h2>
      <a
        href="/productos"
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-lg relative group cursor-pointer"
      >
        <span className="relative">
          Ver Todo
          <span
            className={`
              absolute left-0 bottom-0 h-0.5
              w-0
              group-hover:w-full
              group-hover:bg-secondary
              transition-all duration-300 ease-in-out
            `}
            style={{ display: "block" }}
          ></span>
        </span>
      </a>
    </main>
  )
}
