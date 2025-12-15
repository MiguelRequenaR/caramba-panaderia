import AboutSection from "./components/AboutSection";

export default function About() {
  return (
    <main
    className="bg-[#fdfdfd] pt-20 md:pt-50"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h2
        className="text-3xl font-bold uppercase text-secondary text-center">
        Nuestra Historia
      </h2>
      <p
        className="text-secondary text-center text-lg font-bold">
        Conoce un poco más sobre nosotros
      </p>
      <AboutSection />
    </main>
  )
}
