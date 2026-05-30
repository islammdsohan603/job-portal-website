import FeaturedJobs from "@/components/FeaturedJobs";
import FeaturesSection from "@/components/FeaturesSection";
import Banner from "@/components/homepage/Banner";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedJobs />
      <FeaturesSection />
      <PricingSection />
    </div>
  );
}
