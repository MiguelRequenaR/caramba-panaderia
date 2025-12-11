import AboutSection from "./components/AboutSection";

export default function About() {
  return (
    <main
    className="bg-[#f8f7ee] pt-20 md:pt-50"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h1
        className="text-3xl font-bold uppercase text-secondary text-center">
        Nuestra Historia
      </h1>
      <p
        className="text-secondary text-center text-lg font-bold">
        Conoce un poco más sobre nosotros
      </p>
      <AboutSection />
    </main>
  )
}
