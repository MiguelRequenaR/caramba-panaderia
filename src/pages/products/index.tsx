import CategoryCard from "@/components/CategoryCard";

export default function Products() {
  return (
    <main
      className="bg-[#f8f7ee] pt-20 md:pt-50"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h1
        className="text-2xl font-bold uppercase text-secondary text-center">
        Encuentra todos nuestros productos
      </h1>
      <p
        className="text-secondary text-center font-bold">
        Listos para satisfacer hasta los más exigentes gustos
      </p>
      <CategoryCard />
    </main>
  )
}
