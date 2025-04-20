
import { useEffect } from 'react';
import TimelineSection from '@/components/features/TimelineSection';
import HeroSection from '@/components/features/HeroSection';
import FeaturesGrid from '@/components/features/FeaturesGrid';
import SoilParametersSection from '@/components/features/SoilParametersSection';
import SensorDemoSection from '@/components/features/SensorDemoSection';
import CTASection from '@/components/features/CTASection';

const Features = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <TimelineSection />
      <HeroSection />
      <FeaturesGrid />
      <SoilParametersSection />
      <SensorDemoSection />
      <CTASection />
    </div>
  );
};

export default Features;
