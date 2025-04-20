
import React from 'react';
import { useEffect } from 'react';
import DataVisualizer from '@/components/DataVisualizer';

const HeroSection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const challenges = [
    {
      title: "Unpredictable Climate Patterns",
      description: "Farmers face increasing uncertainty due to changing weather patterns and extreme events.",
      solution: "Real-time weather data integration and predictive models to help prepare for changing conditions."
    },
    {
      title: "Inefficient Resource Use",
      description: "Overuse of water, fertilizers, and pesticides increases costs and environmental impact.",
      solution: "Precision application guided by soil sensors and crop-specific needs to reduce waste."
    },
    {
      title: "Soil Degradation",
      description: "Intensive farming practices can lead to loss of soil health and fertility over time.",
      solution: "Soil health monitoring and regenerative practice recommendations based on your specific soil profile."
    },
    {
      title: "Labor Shortages",
      description: "Finding and retaining skilled farm labor is increasingly difficult.",
      solution: "Automation and decision support tools that simplify management and reduce labor requirements."
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200" 
          alt="Hands touching soil" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-soilsmart-green-dark/40"></div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-soilsmart-green/30 rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 border-4 border-soilsmart-green/30 -rotate-12"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-soilsmart-green/10 rounded-full"></div>
      </div>
      
      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            The SmartSoil <span className="text-soilsmart-green-light">Solution</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Transforming traditional farming practices with data-driven precision agriculture to address modern agricultural challenges.
          </p>
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <a href="#challenges" className="btn-primary">
              Explore 
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
