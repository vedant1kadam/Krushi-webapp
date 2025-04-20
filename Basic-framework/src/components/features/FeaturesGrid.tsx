
import { Leaf, Cloud, Droplets, Map, LineChart, Database, Zap, Settings } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="feature-card">
      <div className="text-soilsmart-green mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesGrid = () => {
  const features = [
    {
      icon: Leaf,
      title: "Soil Monitoring",
      description: "Get soil health metrics including pH, nutrient levels, and moisture content through soil testing lab."
    },
    {
      icon: Droplets,
      title: "Fertilizer Suggestion",
      description: "Optimize fertilizer application with Crop-specific recommendations."
    },
    {
      icon: LineChart,
      title: "Prediction Models",
      description: "Advanced analytics models used to recomend crop and optimize harvest timing."
    },
    {
      icon: Zap,
      title: "Efficiency Insights",
      description: "Reduce operational costs and time by recommending optimal crop."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
