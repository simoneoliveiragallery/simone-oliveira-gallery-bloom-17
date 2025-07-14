
import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingContactButtons from '../components/FloatingContactButtons';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import StudioSection from '../components/sections/StudioSection';
import ContactSection from '../components/sections/ContactSection';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [logoVisible, setLogoVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsLoaded(true);

    // Only track mouse position on desktop for performance
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  // Handle logo visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const logoHeight = 200; // Approximate height of logo section
      setLogoVisible(scrollPosition < logoHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-soft-beige overflow-hidden">
      {/* Dados Estruturados Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ArtGallery",
            "name": "Simone Oliveira Art Gallery",
            "description": "Galeria de arte contemporânea brasileira especializada em obras abstratas e pinturas exclusivas da artista plástica Simone Oliveira",
            "url": "https://simone-oliveira-art.lovable.app",
            "image": "/lovable-uploads/LOGO-SIMONE-OLIVEIRA-ART.png",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressRegion": "São Paulo"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Arte Contemporânea",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "VisualArtwork",
                    "name": "Pinturas Abstratas",
                    "artform": "Pintura",
                    "creator": {
                      "@type": "Person",
                      "name": "Simone Oliveira"
                    }
                  }
                }
              ]
            }
          })
        }}
      />
      <Navigation />

      {/* Floating Elements Background - Desktop only for performance */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-warm-terracotta/10 to-light-blue/10 rounded-full blur-3xl floating"
            style={{
              left: mousePosition.x * 0.02 + '%',
              top: mousePosition.y * 0.02 + '%'
            }}
          />
          <div
            className="absolute w-64 h-64 bg-gradient-to-r from-gentle-green/10 to-warm-terracotta/10 rounded-full blur-3xl floating"
            style={{
              right: mousePosition.x * 0.01 + '%',
              bottom: mousePosition.y * 0.01 + '%',
              animationDelay: '2s'
            }}
          />
        </div>
      )}

      {/* Hero Section */}
      <HeroSection 
        isLoaded={isLoaded}
        mousePosition={mousePosition}
        logoVisible={logoVisible}
      />

      {/* About Section */}
      <AboutSection />

      {/* Studio Section */}
      <StudioSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Floating Contact Buttons */}
      <FloatingContactButtons />

      <Footer />
    </div>
  );
};

export default Index;
