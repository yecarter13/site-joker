import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import MethodSection from "@/components/MethodSection";
import AvailableListings from "@/components/AvailableListings";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommitmentsSection from "@/components/CommitmentsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WaveDivider color="#f9fafb" />
        <MethodSection />
        <WaveDivider />
        <AvailableListings />
        <WaveDivider color="#f9fafb" />
        <TestimonialsSection />
        <WaveDivider />
        <CommitmentsSection />
        <WaveDivider />
        <PricingSection />
        <WaveDivider color="#f9fafb" />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
