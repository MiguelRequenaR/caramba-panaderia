import CallToActionHome from "./components/CallToActionHome";
import HeroSection from "./components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import AllProductsSection from "./components/AllProductsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoryCard />
      <CallToActionHome />
      <AllProductsSection />
    </main>
  )
}
