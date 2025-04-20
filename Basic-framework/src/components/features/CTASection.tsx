
const CTASection = () => {
  return (
    <section className="py-16 bg-soilsmart-green">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to optimize your farm's potential?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          let me help you in upgrading and improving you crop choice with the help of Krushi.
        </p>
        <a 
          href="/Solution" 
          className="bg-white text-soilsmart-green-dark px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300"
        >
          lets decide a fertilizer
        </a>
      </div>
    </section>
  );
};

export default CTASection;
