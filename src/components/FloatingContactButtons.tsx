
import { Mail } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";

const FloatingContactButtons = () => {
  const whatsappNumber = "5534991101000";
  const email = "gallery@simoneoliveiragallery.com";
  
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre as obras de Simone Oliveira.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Interesse nas obras de Simone Oliveira");
    const body = encodeURIComponent("Olá Simone,\n\nGostaria de saber mais sobre suas obras.\n\nAguardo seu contato.");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-elegant hover-lift-elegant transition-all duration-300 flex items-center justify-center group"
        title="Falar no WhatsApp"
      >
        <BsWhatsapp size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Email Button */}
      <button
        onClick={handleEmail}
        className="w-14 h-14 bg-warm-terracotta hover:bg-warm-terracotta/90 text-soft-beige rounded-full shadow-elegant hover-lift-elegant transition-all duration-300 flex items-center justify-center group"
        title="Enviar email"
      >
        <Mail size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default FloatingContactButtons;
