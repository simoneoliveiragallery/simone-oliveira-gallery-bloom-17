import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          <div className="reveal-up">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-warm-terracotta/10 rounded-full mb-4 sm:mb-6 touch-manipulation">
              <span className="font-helvetica text-xs sm:text-sm font-medium text-warm-terracotta">Localização</span>
            </div>

            <h2 className="font-semplicita text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-deep-black mb-6 sm:mb-8 leading-tight">
              Visite a Galeria
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: MapPin,
                  title: 'Endereço',
                  content: 'Rua Elias Alves da Cunha, 73\nSão Lucas, Patrocínio - MG\nCEP: 38747-506'
                },
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
              <div className="bg-gentle-green/10 rounded-xl p-4 mb-6">
                <h4 className="font-helvetica font-semibold text-deep-black mb-2 text-sm sm:text-base">Horário de Funcionamento</h4>
                <p className="font-helvetica text-deep-black/70 text-sm sm:text-base">Visitação mediante agendamento</p>
                <p className="font-helvetica text-deep-black/60 text-xs sm:text-sm mt-1">Entre em contato para agendar sua visita</p>
              </div>

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

          <div
            className="h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant hover-lift-elegant reveal-up touch-manipulation"
            style={{ animationDelay: '0.3s' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.8631987654!2d-46.9942235!3d-18.9354321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c08b49a0b4c8d9%3A0x8a8b8c0d1e2f3a4b!2sRua%20Elias%20Alves%20da%20Cunha%2C%2073%20-%20S%C3%A3o%20Lucas%2C%20Patroc%C3%ADnio%20-%20MG%2C%2038747-506!5e0!3m2!1spt!2sbr!4v1649876543210!5m2!1spt!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Simone Oliveira Art Gallery"
              className="filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;