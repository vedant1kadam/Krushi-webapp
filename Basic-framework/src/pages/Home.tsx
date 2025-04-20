import React from 'react';
import { useEffect } from 'react';
import DataVisualizer from '@/components/DataVisualizer';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
                SmartSoil Farming: <br /><span className="text-soilsmart-green">Precision Crop Recommendation</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
                Advanced soil Analysis and Intelligent crop Recommendation for Sustainable agriculture
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <a href="#learn-more" className="btn-primary flex items-center justify-center">
                  Learn More
                </a>
                <a href="/contact" className="border border-soilsmart-green text-soilsmart-green px-6 py-3 rounded-md hover:bg-soilsmart-green hover:text-white transition-colors duration-300 flex items-center justify-center">
                  Contact 
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="w-60 h-60 md:w-80 md:h-80 rounded-full bg-soilsmart-green/10 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400&h=400" 
                    alt="Seedling with sensors" 
                    className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-lg"
                  />
                  
                  {/* Circular sensor icons */}
                  {[1, 2, 3, 4].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center animate-pulse-green"
                      style={{
                        top: `${20 + i * 20}%`,
                        left: i % 2 === 0 ? '10%' : '80%',
                        animationDelay: `${i * 0.5}s`
                      }}
                    >
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-soilsmart-green rounded-full"></div>
                    </div>
                  ))}
                </div>
                
                {/* Real-time data visualization */}
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-40 md:w-60">
                  <DataVisualizer lines={3} refreshRate={3000} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Section */}
      <section id="learn-more" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-soilsmart-green/10 rounded-xl overflow-hidden shadow-md">
              <div className="p-6 md:p-8">
                <div className="h-48 mb-6 overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600&h=300" 
                    alt="People shaking hands" 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <blockquote className="text-lg md:text-xl italic text-gray-700 mb-4">
                  "Soil testing optimizing crop selection reduces costs, enhances soil health, and prevents environmental damage with the help of data-driven insights."
                </blockquote>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-soilsmart-green flex items-center justify-center">
                      <span className="text-white font-bold text-xs">SS</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">SmartSoil Research and Analysis</p>
                    <p className="text-sm text-gray-500">Helps Farmers in Agricultural</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="bg-soilsmart-green/10 rounded-xl overflow-hidden shadow-md">
              <div className="p-6 md:p-8">
                <div className="h-48 mb-6 overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600&h=300" 
                    alt="Tractor in field" 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Farming with data</h3>
                  <p className="text-gray-700">
                    Improving yields and managing nutrients efficiently, supporting sustainable farming and climate adaptation.
                  </p>
                  <div className="pt-4">
                    <div className="space-y-2">
                    <div className="flex items-center">
                        <div ></div>
                        <span className="text-sm text-gray-600">Can result in:</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-soilsmart-green rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">30% Higher Crop Yield</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-soilsmart-green rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">40% Reduced Water Usage</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-soilsmart-green rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">25% Less Fertilizer Needed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to transform your farming?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            let me help you in upgrading and improving you crop choice with the help of Krushi.
          </p>
          <a href="/Features" className="btn-primary inline-block">Lets Get started</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
