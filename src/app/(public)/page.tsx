import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesGrid";
import ApproachSection from "@/components/sections/ApproachSection";
import Testimonials from "@/components/sections/Testimonials";
import FAQAccordion from "@/components/sections/FAQAccordion";
import BlogPreview from "@/components/sections/BlogPreview";
import CTAStrip from "@/components/sections/CallToActionStrip";
import MultimediaPostsSection from "@/components/sections/MultimediaPostsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MultimediaPostsSection />
      <StatsSection />
      <ServicesSection />
      <ApproachSection />
      <Testimonials />
      <FAQAccordion />
      <BlogPreview />
      <CTAStrip />
    </>
  );
}
