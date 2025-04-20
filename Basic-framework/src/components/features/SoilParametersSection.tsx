
import SoilParametersForm from '@/components/SoilParametersForm';

const SoilParametersSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Enter The Soil Parameters
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <SoilParametersForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoilParametersSection;
