import HomeHeader from "@/components/home/home-header";
import HomeFooter from "@/components/home/home-footer";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturesSection } from "@/components/home/features-section";

export default async function Home() {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <div className="min-h-screen bg-slate-900">
      <HomeHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
      </main>
      <HomeFooter />
    </div>
  );
}
