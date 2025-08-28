
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingContactButtons from '../components/FloatingContactButtons';
import { Mail, Phone } from 'lucide-react';
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

                  {/* E-mail */}
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

            {/* Art Gallery */}
            <div className="h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-elegant bg-gradient-to-br from-warm-terracotta/10 to-gentle-green/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-warm-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={40} className="text-warm-terracotta" />
                </div>
                <h3 className="font-semplicita text-2xl text-deep-black mb-4">Entre em Contato</h3>
                <p className="font-helvetica text-deep-black/70 text-sm mb-6 max-w-sm">
                  Use nossos canais de comunicação para descobrir mais sobre as obras de Simone Oliveira
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-helvetica text-sm font-medium transition-all duration-300 group"
                  >
                    <BsWhatsapp size={16} className="mr-2" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleEmail}
                    className="flex items-center justify-center px-4 py-2 bg-warm-terracotta hover:bg-warm-terracotta/90 text-soft-beige rounded-lg font-helvetica text-sm font-medium transition-all duration-300 group"
                  >
                    <Mail size={16} className="mr-2" />
                    E-mail
                  </button>
                </div>
              </div>
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
