import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <div className="reveal-up">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gentle-green/20 rounded-full mb-4 sm:mb-6 touch-manipulation">
              <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Sobre a Artista</span>
            </div>

            <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-deep-black mb-4 sm:mb-6 leading-tight">
              Visão
              <span className="text-gradient-artistic"> Artística</span>
            </h2>

            <p className="font-helvetica text-sm sm:text-base text-deep-black/80 leading-relaxed mb-3 sm:mb-4 font-light justified-text">
              Simone é uma <strong>artista plástica brasileira</strong> em 
              <strong>arte contemporânea</strong> de <strong>obras abstratas únicas</strong> que exploram as profundezas.
            </p>

            <p className="font-helvetica text-sm sm:text-base text-deep-black/80 leading-relaxed mb-6 sm:mb-8 font-light justified-text">
              Com mais de 20 anos de dedicação a <strong>arte contemporânea</strong>, um estilo próprio que
              combina técnicas tradicionais com elementos modernos, criando <strong>quadros exclusivos</strong> 
              que encantam apreciadores de <strong>arte moderna brasileira</strong>.
            </p>

            <Link
              to="/artists"
              className="inline-flex items-center text-warm-terracotta font-helvetica font-medium hover:text-warm-terracotta/80 transition-all duration-300 group text-sm sm:text-base touch-manipulation active:scale-95"
            >
              Conheça mais sobre Simone
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
            </Link>
          </div>

          <div className="reveal-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-warm-terracotta/20 to-light-blue/20 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
              <img
                src="/lovable-uploads/1730db82-b48a-4890-a40a-92dcfb123144.png"
                alt="Simone Oliveira - Artista Plástica Brasileira especializada em Arte Contemporânea"
                className="relative w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-elegant hover-lift-elegant"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;