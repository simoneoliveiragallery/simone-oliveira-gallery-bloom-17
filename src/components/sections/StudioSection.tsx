const StudioSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gentle-green/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl font-light text-deep-black mb-3 sm:mb-4">
            No Ateliê
          </h2>
          <p className="font-helvetica text-sm sm:text-base text-deep-black/80 max-w-2xl mx-auto justified-text font-normal text-center">
            Simone tem seu processo criativo onde cada obra nasce da paixão e dedicação à arte.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
          <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
            <img
              src="/lovable-uploads/e06b8e32-b139-4ac9-9789-dd2d68767dca.png"
              alt="Simone Oliveira pintando em seu ateliê"
              className="w-auto h-auto max-h-48 sm:max-h-64 object-contain rounded-xl"
            />
          </div>
          <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
            <img
              src="/lovable-uploads/79f14aaa-ddef-4045-8d3e-50714c9dc43b.png"
              alt="Simone Oliveira criando arte"
              className="w-auto h-auto max-h-48 sm:max-h-64 object-contain rounded-xl"
            />
          </div>
          <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
            <img
              src="/lovable-uploads/simone-pintando.jpg"
              alt="Simone Oliveira criando arte"
              className="w-auto h-auto max-h-48 sm:max-h-64 object-contain rounded-xl"
            />
          </div>
          <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
            <img
              src="/lovable-uploads/03348f07-97c9-429b-a76d-774e1979a3e4.png"
              alt="Simone Oliveira com pincéis"
              className="w-auto h-auto max-h-48 sm:max-h-64 object-contain rounded-xl"
            />
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center">
          <div className="bg-gentle-green/20 rounded-xl p-4 max-w-md mx-auto">
            <h3 className="font-semplicita text-lg sm:text-xl font-light text-deep-black mb-2">
              Processo Criativo
            </h3>
            <p className="font-helvetica text-xs sm:text-sm text-deep-black/80 leading-relaxed justified-text">
              Cada obra é resultado de um processo meditativo e intuitivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioSection;