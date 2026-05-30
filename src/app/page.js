import FeaturedJobs from "@/components/FeaturedJobs";
import FeaturesSection from "@/components/FeaturesSection";
import Banner from "@/components/homepage/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedJobs />
      <FeaturesSection />
    </div>
  );
}
