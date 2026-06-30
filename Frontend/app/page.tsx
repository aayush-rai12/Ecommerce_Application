import CategoryCircles from "../components/home/CategoryCircles";
import Hero from "../components/home/Hero";
import ProductGrid from "../components/home/ProductGrid";
import BrandSection from "../components/home/BrandSection";
import CTASection from "../components/CTASection";
import StatsBar from "../components/home/StatsBar";
import OccasionCarousel from "../components/home/OccasionCarousel";
import CollectionsGrid from "../components/home/CollectionsGrid";
import CharacterSection from "../components/home/CharacterSection";
import Newsletter from "@/components/home/Newsletter";
import ReelsSection from "@/components/home/ReelsSection";

export default function Home() {
  
  return (
    <>

      <main>
        <Hero />
        <CategoryCircles />
        <StatsBar />
        <OccasionCarousel />
        <CollectionsGrid/>
        <ProductGrid />
        <CharacterSection />
        <ReelsSection/>
        <BrandSection />
        <Newsletter/>

        {/* <CTASection /> */}
      </main>

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}