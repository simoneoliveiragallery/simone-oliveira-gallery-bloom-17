import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          <div className="reveal-up">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-warm-terracotta/10 rounded-full mb-4 sm:mb-6 touch-manipulation">
              <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Entre em Contato</span>
            </div>

            <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-deep-black mb-6 sm:mb-8 leading-tight">
              Fale Conosco
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Phone,
                  title: 'WhatsApp',
                  content: '(34) 99110-1000'
                },
                {
                  icon: Mail,
                  title: 'E-mail',
                  content: 'gallery@simoneoliveiragallery.com'
                }
              ].map((item, index) => (
                <div key={item.title} className="flex items-start space-x-3 sm:space-x-4 group touch-manipulation">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-warm-terracotta/10 rounded-xl flex items-center justify-center group-hover:bg-warm-terracotta/20 transition-colors duration-300">
                    <item.icon size={18} className="text-warm-terracotta sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-helvetica font-semibold text-deep-black mb-1 text-sm sm:text-base">{item.title}</h3>
                    <p className="font-helvetica text-deep-black/70 whitespace-pre-line leading-relaxed text-sm sm:text-base">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center px-4 sm:px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 group shadow-elegant hover-lift-elegant text-sm sm:text-base touch-manipulation active:scale-95"
                style={{ minHeight: '48px' }}
              >
                <span className="relative z-10 flex items-center">
                  Entre em Contato
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
                </span>
              </Link>
            </div>
          </div>

          <div className="reveal-up" style={{ animationDelay: '0.3s' }}>
            <div className="h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant bg-gradient-to-br from-warm-terracotta/10 to-gentle-green/10 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-warm-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-warm-terracotta" />
                </div>
                <h3 className="font-semplicita text-xl text-deep-black mb-2">Entre em Contato</h3>
                <p className="font-helvetica text-deep-black/70 text-sm">Use nossos canais de comunicação para saber mais sobre as obras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;