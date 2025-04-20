
import DataVisualizer from '@/components/DataVisualizer';

const HeroSection = () => {
  return (
    <section className="py-16 bg-soilsmart-green/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <DataVisualizer lines={12} refreshRate={2500} dataPrefix="SENSOR:" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in">
            Importance of SmartSoil Features
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Picking the right crop for your field can maximize yields while minimizing inputs and environmental impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
