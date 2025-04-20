
import { useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-soilsmart-green/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in">
              Contact Me
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Have any questions about me ot my projects? I love to hear from you !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Form */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 md:p-8 h-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-soilsmart-green/10 flex items-center justify-center text-soilsmart-green">
                      <Mail size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a href="mailto:kadamvedant150@gmail.com" className="text-sm text-soilsmart-green hover:underline">
                        kadamvedant150@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-soilsmart-green/10 flex items-center justify-center text-soilsmart-green">
                      <Phone size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a href="tel:+919167596794" className="text-sm text-soilsmart-green hover:underline">
                        +91-91675-96794
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-soilsmart-green/10 flex items-center justify-center text-soilsmart-green">
                      <MapPin size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">
                        Mumbai 400101<br />
                        Maharashtra<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Working Hours</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>When I want to work</p>
                    <p>OR</p>
                    <p>Whenever I have work</p>
                    <p>PLEASE HIRE ME !!!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Map section</h2>
            <div className="rounded-lg overflow-hidden shadow-md h-96 bg-gray-200">
              {/* Placeholder for map */}
              <div className="w-full h-full flex items-center justify-center bg-soilsmart-green/5 relative">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1400&h=600" 
                    alt="Map placeholder" 
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
                <div className="relative z-10 text-center p-6">
                  <div className="inline-block p-3 rounded-full bg-soilsmart-green/90 mb-4 animate-pulse">
                    <MapPin size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600 mt-2">Mumbai , Maharashtra</p>
                  <div className="mt-4">
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center"
                    >
                      <span>Opens Google map</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
