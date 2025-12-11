import CallToActionHome from "./components/CallToActionHome";
import StoreAndHistorySection from "./components/StoreAndHistorySection";
import HeroSection from "./components/HeroSection";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoryCard />
      <CallToActionHome />
      <StoreAndHistorySection />
    </main>
  )
}
