
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Mail } from 'lucide-react';
import { BsWhatsapp } from "react-icons/bs";
import { Artwork } from '../hooks/useArtworks';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

const ArtworkModal = ({ artwork, onClose }: ArtworkModalProps) => {
  if (!artwork) return null;

  const whatsappNumber = "5534991101000";
  const email = "gallery@simoneoliveiragallery.com";

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre a obra "${artwork.title}" e seu preço. Poderia me fornecer mais informações?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Interesse na obra: ${artwork.title}`);
    const body = encodeURIComponent(`Olá Simone,\n\nGostaria de saber mais sobre a obra "${artwork.title}" (${artwork.year}).\n\nPoderia me informar:\n- Preço da obra\n- Disponibilidade\n- Formas de pagamento\n- Outras informações relevantes\n\nAguardo seu contato.\n\nObrigado(a)!`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <Dialog open={!!artwork} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-soft-beige border-gentle-green/20">
        {/* Dados Estruturados Schema.org para Obra de Arte */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VisualArtwork",
              "name": artwork.title,
              "artform": "Pintura",
              "artMedium": artwork.medium,
              "description": artwork.description,
              "creator": {
                "@type": "Person",
                "name": artwork.artist
              },
              "dateCreated": artwork.year,
              "image": artwork.image,
              "size": artwork.dimensions,
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Simone Oliveira Art Gallery"
                }
              }
            })
          }}
        />
        <DialogHeader>
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gentle-green/10 rounded-full transition-colors duration-300"
            >
              <X size={20} className="text-deep-black/70" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div className="flex items-center justify-center bg-gentle-green/5 rounded-2xl p-4">
            <img
              src={artwork.image}
              alt={`${artwork.title} de Simone Oliveira - ${artwork.medium} (${artwork.year})`}
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
          </div>
          
            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <span className="font-helvetica text-sm font-medium text-deep-black/70">Obra: </span>
                  <span className="font-semplicita text-xl font-bold text-warm-terracotta">{artwork.title}</span>
                </div>
                
                <div>
                  <span className="font-helvetica text-sm font-medium text-deep-black/70">Técnica: </span>
                  <span className="font-helvetica text-deep-black">{artwork.medium}</span>
                </div>
                
                {artwork.dimensions && (
                  <div>
                    <span className="font-helvetica text-sm font-medium text-deep-black/70">Dimensões: </span>
                    <span className="font-helvetica text-deep-black">{artwork.dimensions}</span>
                  </div>
                )}
                
                {artwork.description && (
                  <div>
                    <span className="font-helvetica text-sm font-medium text-deep-black/70">Descrição: </span>
                    <span className="font-helvetica text-deep-black leading-relaxed">{artwork.description}</span>
                  </div>
                )}
                
                 <div>
                   <span className="font-helvetica text-sm font-medium text-deep-black/70">
                     {artwork.artist && artwork.artist.includes(' e ') ? 'Artistas: ' : 'Artista: '}
                   </span>
                   <span className="font-helvetica text-warm-terracotta font-medium text-lg">{artwork.artist}</span>
                 </div>
                
                <div>
                  <span className="font-helvetica text-sm font-medium text-deep-black/70">Ano: </span>
                  <span className="font-helvetica text-deep-black">{artwork.year}</span>
                </div>
                
                {artwork.collection_id && (
                  <div>
                    <span className="font-helvetica text-sm font-medium text-deep-black/70">Coleção: </span>
                    <span className="font-helvetica text-deep-black">Obra de coleção</span>
                  </div>
                )}
              </div>

            {/* Botões de Contato */}
            <div className="border-t border-gentle-green/20 pt-6">
              <h4 className="font-semplicita text-lg font-light text-deep-black mb-4">
                Interessado nesta obra?
              </h4>
              <p className="font-helvetica text-sm text-deep-black/70 mb-4">
                Entre em contato para saber mais sobre preço e disponibilidade
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-helvetica font-medium transition-all duration-300 group shadow-lg hover-lift-elegant"
                >
                  <BsWhatsapp size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  WhatsApp
                </button>
                
                <button
                  onClick={handleEmail}
                  className="flex items-center justify-center px-4 py-3 bg-warm-terracotta hover:bg-warm-terracotta/90 text-soft-beige rounded-xl font-helvetica font-medium transition-all duration-300 group shadow-lg hover-lift-elegant"
                >
                  <Mail size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  E-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;
