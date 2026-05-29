import HeroSection from "@/components/homepage/Banner";
import Banner from "@/components/homepage/Banner";
import { ToastContainer } from "react-toastify";


export default function Home() {
  return (
    <div>
      <Banner />
      <ToastContainer />
    </div>
  );
}
