
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-soilsmart-green flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Krushi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active-nav-link' : ''}`}>
              🏠 Home
            </Link>
            <Link to="/features" className={`nav-link ${isActive('/features') ? 'active-nav-link' : ''}`}>
              🌿 Features
            </Link>
            <Link to="/solution" className={`nav-link ${isActive('/solution') ? 'active-nav-link' : ''}`}>
              ⚙️ Solution
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active-nav-link' : ''}`}>
              ✉️ Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-soilsmart-green focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white mt-4 rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col py-2">
              <Link 
                to="/" 
                className={`px-4 py-3 hover:bg-gray-100 ${isActive('/') ? 'text-soilsmart-green font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link 
                to="/features" 
                className={`px-4 py-3 hover:bg-gray-100 ${isActive('/features') ? 'text-soilsmart-green font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                🌿 Features
              </Link>
              <Link 
                to="/solution" 
                className={`px-4 py-3 hover:bg-gray-100 ${isActive('/solution') ? 'text-soilsmart-green font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                ⚙️ Solution
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-3 hover:bg-gray-100 ${isActive('/contact') ? 'text-soilsmart-green font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                ✉️ Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
