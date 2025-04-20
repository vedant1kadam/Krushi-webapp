
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-soilsmart-green flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Krushi</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">SmartSoil Farming: Precision Crop Recommendation</p>
          </div>
          
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((_, index) => (
              <div 
                key={index} 
                className="w-8 h-1 bg-soilsmart-gray rounded-full opacity-60"
              />
            ))}
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-soilsmart-green transition-colors">Home</Link>
              <Link to="/features" className="text-gray-600 hover:text-soilsmart-green transition-colors">Features</Link>
              <Link to="/solution" className="text-gray-600 hover:text-soilsmart-green transition-colors">Solution</Link>
              <Link to="/contact" className="text-gray-600 hover:text-soilsmart-green transition-colors">Contact</Link>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">© 2025 SmartSoil Farming. All rights reserved !.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
