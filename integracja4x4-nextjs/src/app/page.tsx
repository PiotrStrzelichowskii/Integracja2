import NavBar from "@/components/redesign/NavBar";
import HeroSection from "@/components/redesign/HeroSection";
import StatsBar from "@/components/redesign/StatsBar";
import OfferSection from "@/components/redesign/OfferSection";
import ReelsSection from "@/components/redesign/ReelsSection";
import AboutSection from "@/components/redesign/AboutSection";
import TestimonialsSection from "@/components/redesign/TestimonialsSection";
import CTASection from "@/components/redesign/CTASection";
import GallerySection from "@/components/redesign/GallerySection";
import ContactSection from "@/components/redesign/ContactSection";
import FooterSection from "@/components/redesign/FooterSection";

export default function HomePage() {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-body selection:bg-primary-container/30 overflow-x-hidden">
      <NavBar />
      <main>
        <HeroSection />
        <StatsBar />
        <OfferSection />
        <ReelsSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
        <GallerySection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
