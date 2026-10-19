import { HeroSection } from '../components/home/HeroSection';
// import { WorkflowSection } from '../components/home/Workflow/WorkflowSection';
import { WhyVivi } from '../components/home/WhyVivi';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { HomeShowcaseAndGallery } from '../components/home/HomeShowcaseAndGallery';
import { PricingSection } from '../components/pricing/PricingSection';
// import Newsletter from '../components/Newsletter';
import WorkflowShowcase from "../components/home/WorkflowShowcase";
export function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <WorkflowSection /> */}
      <WorkflowShowcase />
      <HomeShowcaseAndGallery />
      <WhyVivi />
      <BenefitsSection />      
      <PricingSection />
      {/* <Newsletter /> */}
    </>
  );
}
