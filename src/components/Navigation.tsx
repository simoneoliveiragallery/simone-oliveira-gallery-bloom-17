import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigationItems = [{
    name: 'Início',
    path: '/'
  }, {
    name: 'Obras',
    path: '/obras'
  }, {
    name: 'Sobre a Artista',
    path: '/artists'
  }, {
    name: 'Sobre a Galeria',
    path: '/about'
  }, {
    name: 'Contato',
    path: '/contact'
  }];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide/show navigation on mobile when scrolling
      if (isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setNavVisible(false);
          setIsMenuOpen(false);
        } else {
          setNavVisible(true);
        }
      } else {
        // On desktop, show logo in nav only after main logo disappears (only on home page)
        if (location.pathname === '/') {
          const logoHeight = 200;
          setNavVisible(currentScrollY > logoHeight);
        } else {
          setNavVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  return <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!navVisible && isMobile ? '-translate-y-full' : 'translate-y-0'} ${scrolled ? 'bg-soft-beige/95 border-b border-gentle-green/20 shadow-elegant backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            <Link to="/" className={`flex items-center hover:scale-105 transition-all duration-500 touch-manipulation ${navVisible || isMobile ? 'opacity-100' : 'opacity-0'}`} onClick={handleLinkClick}>
              <img src="/lovable-uploads/LOGO-SIMONE-OLIVEIRA-ART.png" alt="Simone Oliveira Art Gallery" className="h-10 sm:h-12 lg:h-16 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navigationItems.map((item, index) => <Link key={item.name} to={item.path} className={`relative px-3 lg:px-6 py-2 lg:py-3 font-helvetica text-xs lg:text-sm font-medium transition-all duration-300 rounded-full group touch-manipulation ${isActive(item.path) ? 'text-soft-beige bg-warm-terracotta shadow-lg' : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'}`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <span className="relative z-10">{item.name}</span>
                  {!isActive(item.path) && <div className="absolute inset-0 rounded-full bg-warm-terracotta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                </Link>)}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={handleMenuToggle} className="relative p-3 text-deep-black hover:text-warm-terracotta transition-colors duration-300 rounded-full hover:bg-gentle-green/20 touch-manipulation active:scale-95" aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
                <div className="relative w-5 h-5">
                  <Menu size={20} className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X size={20} className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
            <div className="bg-soft-beige/98 backdrop-blur-lg border border-gentle-green/20 rounded-2xl mx-2 mb-4 overflow-hidden shadow-2xl">
              <div className="p-2">
                {navigationItems.map((item, index) => <Link key={item.name} to={item.path} onClick={handleLinkClick} className={`block px-4 py-4 font-helvetica text-base font-medium transition-all duration-300 rounded-xl touch-manipulation active:scale-98 stagger-animation ${isActive(item.path) ? 'text-soft-beige bg-warm-terracotta shadow-lg' : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20 active:bg-gentle-green/30'}`} style={{
                animationDelay: `${index * 0.1}s`,
                minHeight: '44px' // Minimum touch target size
              }}>
                    <div className="flex items-center h-full">
                      {item.name}
                    </div>
                  </Link>)}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && isMobile && <div className="fixed inset-0 bg-deep-black/20 z-40 md:hidden backdrop-blur-sm" onClick={handleLinkClick} />}
      
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator" style={{
      transform: `scaleX(${typeof window !== 'undefined' ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0})`
    }} />
    </>;
};
export default Navigation;