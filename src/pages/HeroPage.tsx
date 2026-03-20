import BeforeMainSection from "../components/BeforeMainSection";
import HeroOverlay from "../components/HeroOverlay";
import MyPortfolioSection from '../components/MyPortfolioSection';
import MySection from "../components/MySection";
import MyToolsSection from '../components/MyToolsSection';

export default function HeroPage() {
  return (
    <div>
      <HeroOverlay />
      <BeforeMainSection />

      <main className="relative z-10 bg-black-950 px-6 sm:px-12 md:px-20 lg:px-32 py-32">

        <MyToolsSection />

        <MyPortfolioSection />

        <MySection />

      </main>
    </div>
  );
}