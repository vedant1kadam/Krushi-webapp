
import React from 'react';

const ImpactStats = () => {
  return (
    <section className="py-16 bg-soilsmart-green-dark text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            The Smartsoil Impact
          </h2>
          <p className="text-lg text-white/80">
            results from implementing smart agariculture.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-soilsmart-green-light mb-2">30%</div>
            <div className="text-lg font-medium">Increased Yield</div>
            <p className="text-sm text-white/70 mt-2">Average increase in crop yield across diverse farming operations</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-soilsmart-green-light mb-2">40%</div>
            <div className="text-lg font-medium">Water Saved</div>
            <p className="text-sm text-white/70 mt-2">Reduction in water usage through precision irrigation guidance</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-4xl font-bold text-soilsmart-green-light mb-2">35%</div>
            <div className="text-lg font-medium">Cost Reduction</div>
            <p className="text-sm text-white/70 mt-2">Average savings on fertilizer and other input costs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
