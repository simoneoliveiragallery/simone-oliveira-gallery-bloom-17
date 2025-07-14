
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Gallery Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-playfair text-xl font-semibold text-white">Simone Oliveira Art Gallery</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Arte contemporânea de qualidade excepcional. Descobra obras únicas que tocam a alma 
              e despertam emoções profundas através da expressão artística autêntica.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-gray-400 hover:text-warm-terracotta transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-warm-terracotta transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-warm-terracotta transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://wa.me/5534991101000"
                className="text-gray-400 hover:text-green-500 transition-colors duration-300"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-warm-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Rua Elias Alves da Cunha, 73</p>
                  <p className="text-gray-300 text-sm">São Lucas - Patrocínio, MG</p>
                  <p className="text-gray-300 text-sm">CEP: 38747-506</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-warm-terracotta flex-shrink-0" />
                <span className="text-gray-300 text-sm">gallery@simoneoliveiragallery.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <BsWhatsapp size={16} className="text-green-500 flex-shrink-0" />
                <a href="https://wa.me/5534991101000" className="text-gray-300 text-sm hover:text-green-500 transition-colors">
                  (34) 99110-1000
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-white">Horários de Funcionamento</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-300 text-sm">Visitação</span>
                <span className="text-white text-sm font-medium">Mediante agendamento</span>
              </div>
              <div className="text-gray-300 text-sm">
                <p>Entre em contato para agendar sua visita</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Simone Oliveira Art Gallery. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
