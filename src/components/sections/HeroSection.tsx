import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';
import ArtworkGrid from '../ArtworkGrid';
interface HeroSectionProps {
  isLoaded: boolean;
  mousePosition: {
    x: number;
    y: number;
  };
  logoVisible: boolean;
}
const HeroSection = ({
  isLoaded,
  mousePosition,
  logoVisible
}: HeroSectionProps) => {
  const isMobile = useIsMobile();
  const stats = [{
    icon: Eye,
    label: 'Obras Criadas',
    value: '+50'
  }, {
    icon: Users,
    label: 'Colecionadores',
    value: '+25'
  }, {
    icon: Sparkles,
    label: 'Anos de Carreira',
    value: '+20'
  }];
  return <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 md:pb-24 lg:pb-32 gradient-elegant">
      {/* Parallax background - Desktop only for performance */}
      {!isMobile && <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080')] bg-cover bg-center opacity-5 parallax-bg"></div>}

      <div className={`z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${isLoaded ? 'hero-reveal' : 'opacity-0'}`}>
        {/* Brand Identity - Logo */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-500 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="mb-3 sm:mb-4 md:mb-6">
            <img src="/lovable-uploads/8ffa7e68-70c5-4ea3-a772-87156df4e9f7.png" alt="Simone Oliveira Art Gallery" className="mx-auto h-20 sm:h-32 md:h-40 lg:h-48 w-auto object-contain" />
          </div>

          
          
          <p className="font-helvetica text-sm sm:text-base md:text-lg text-deep-black/80 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light text-center px-2">
            Obras, pinturas exclusivas e
            <span className="text-warm-terracotta font-medium"> arte moderna brasileira </span>
            da artista plástica Simone Oliveira.
          </p>

          {/* Compact Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto mb-8 sm:mb-12">
            {stats.map((stat, index) => <div key={stat.label} className="bg-soft-beige/90 backdrop-blur-lg border border-gentle-green/30 rounded-xl p-3 sm:p-4 text-center hover-lift-elegant stagger-animation touch-manipulation" style={{
            animationDelay: `${0.8 + index * 0.2}s`
          }}>
                <stat.icon size={14} className="mx-auto mb-1 sm:mb-2 text-warm-terracotta sm:w-4 sm:h-4" />
                <div className="font-semplicita text-sm sm:text-lg font-light text-deep-black">{stat.value}</div>
                <div className="font-helvetica text-xs text-deep-black/70 text-center break-words">{stat.label}</div>
              </div>)}
          </div>
        </div>

        {/* Featured Artworks - Now in Hero */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-warm-terracotta/10 rounded-full mb-3 sm:mb-4 touch-manipulation">
              <Sparkles size={12} className="mr-2 text-warm-terracotta sm:w-4 sm:h-4" />
              <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Obras de Destaque</span>
            </div>

            <h2 className="font-semplicita text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-deep-black mb-3 sm:mb-4 leading-tight">
              Criações de <span className="text-gradient-artistic">Simone</span>
            </h2>
          </div>

          <ArtworkGrid featuredOnly={true} />

          <div className="text-center mt-6 sm:mt-8">
            <Link to="/obras" className="inline-flex items-center px-4 sm:px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 group shadow-elegant hover-lift-elegant text-sm sm:text-base touch-manipulation active:scale-95" style={{
            minHeight: '48px'
          }}>
              <span className="relative z-10 flex items-center">
                Ver Todas as Obras
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;