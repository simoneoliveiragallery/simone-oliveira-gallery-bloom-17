
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingContactButtons from '../components/FloatingContactButtons';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";

const Contact = () => {
  const whatsappNumber = "5534991101000";
  const email = "gallery@simoneoliveiragallery.com";

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre as obras de Simone Oliveira.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Contato - Simone Oliveira Art Gallery");
    const body = encodeURIComponent("Olá,\n\nGostaria de entrar em contato.\n\nAguardo retorno.");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-soft-beige">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-semplicita text-4xl md:text-5xl lg:text-6xl font-light text-deep-black mb-4">
              Entre em Contato
            </h1>
            <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto">
              Estamos aqui para ajudar você a descobrir a arte perfeita para sua coleção
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-semplicita text-2xl font-light text-deep-black mb-8">
                  Informações de Contato
                </h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-warm-terracotta/10 rounded-xl flex items-center justify-center">
                      <MapPin size={20} className="text-warm-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-helvetica font-semibold text-deep-black mb-2">Endereço</h3>
                      <p className="font-helvetica text-deep-black/70 leading-relaxed">
                        Rua Elias Alves da Cunha, 73<br />
                        Bairro São Lucas<br />
                        Patrocínio - MG<br />
                        CEP: 38747-506
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <BsWhatsapp size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-helvetica font-semibold text-deep-black mb-2">WhatsApp</h3>
                      <button
                        onClick={handleWhatsApp}
                        className="font-helvetica text-deep-black/70 hover:text-green-500 transition-colors"
                      >
                        (34) 99110-1000
                      </button>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-warm-terracotta/10 rounded-xl flex items-center justify-center">
                      <Mail size={20} className="text-warm-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-helvetica font-semibold text-deep-black mb-2">E-mail</h3>
                      <button
                        onClick={handleEmail}
                        className="font-helvetica text-deep-black/70 hover:text-warm-terracotta transition-colors"
                      >
                        gallery@simoneoliveiragallery.com
                      </button>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gentle-green/20 rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-warm-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-helvetica font-semibold text-deep-black mb-2">Horário de Funcionamento</h3>
                      <p className="font-helvetica text-deep-black/70">
                        Visitação mediante agendamento<br />
                        <span className="text-sm">Entre em contato para agendar sua visita</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="bg-gentle-green/10 rounded-2xl p-8">
                <h3 className="font-semplicita text-xl font-light text-deep-black mb-6">
                  Fale Conosco Agora
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-helvetica font-medium transition-all duration-300 group shadow-lg hover-lift-elegant"
                  >
                    <BsWhatsapp size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    WhatsApp
                  </button>
                  
                  <button
                    onClick={handleEmail}
                    className="flex items-center justify-center px-6 py-3 bg-warm-terracotta hover:bg-warm-terracotta/90 text-soft-beige rounded-xl font-helvetica font-medium transition-all duration-300 group shadow-lg hover-lift-elegant"
                  >
                    <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    E-mail
                  </button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-elegant">
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
      </div>

      <FloatingContactButtons />
      <Footer />
    </div>
  );
};

export default Contact;
