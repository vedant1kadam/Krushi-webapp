
import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/solution/HeroSection';
import SoilAnalysisForm from '@/components/solution/SoilAnalysisForm';
import ImpactStats from '@/components/solution/ImpactStats';
import FertilizerAdvice from '@/components/FertilizerAdvice';

const Solution = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [predictionResult, setPredictionResult] = useState<{
    random_forest_prediction: string;
    decision_tree_prediction: string;
    logistic_regression_prediction: string;
    fertilizer_advice: string;
  } | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Soil Parameters Analysis
            </h2>
            <SoilAnalysisForm onPredictionResult={setPredictionResult} />
            {predictionResult && (
              <FertilizerAdvice 
                predictions={predictionResult}
                className="mt-8"
              />
            )}
          </div>
        </div>
      </section>

      <ImpactStats />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to transform your farm?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have any questions reguarding me or my project.
          </p>
          <a href="/contact" className="btn-primary">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Solution;
