
import DataVisualizer from '@/components/DataVisualizer';

const SensorDemoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Cool animation I found on Bootstrap
            </h2>
            <p className="text-gray-600 mb-6">
              this dosen't mean anything the only reason this is in my project is because it looks cool.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">loading Moisture</span>
                  <span className="text-sm font-medium text-soilsmart-green">72%</span>
                </div>
                <div className="loading-bar"></div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Nitrogen Analysis</span>
                  <span className="text-sm font-medium text-soilsmart-green">45%</span>
                </div>
                <div className="loading-bar"></div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Completion rate</span>
                  <span className="text-sm font-medium text-soilsmart-green">6.8</span>
                </div>
                <div className="loading-bar"></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative max-w-md">
              <div className="bg-white p-5 rounded-xl shadow-xl">
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=600&h=400" 
                    alt="Smart sensors in field" 
                    className="w-full object-cover"
                  />
                </div>
                <DataVisualizer lines={4} refreshRate={1500} dataPrefix="FIELD:" />
              </div>
              {/* Sensor dots animation */}
              {[1, 2, 3 ,4].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-soilsmart-green rounded-full animate-ping"
                  style={{
                    top: `${30 + i * 25}%`,
                    left: i % 2 === 0 ? '5%' : '90%',
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorDemoSection;
