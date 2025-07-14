
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ArtworkGrid from '../components/ArtworkGrid';
import { useCollections } from '../hooks/useCollections';
import { ChevronDown } from 'lucide-react';

const Artworks = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showCollections, setShowCollections] = useState(false);
  const { data: collections = [] } = useCollections();


  return (
    <div className="min-h-screen bg-soft-beige">
      {/* Dados Estruturados Schema.org para Obras */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Obras de Arte - Simone Oliveira Art Gallery",
            "description": "Catálogo completo de obras de arte contemporânea da artista plástica Simone Oliveira",
            "creator": {
              "@type": "Person",
              "name": "Simone Oliveira"
            }
          })
        }}
      />
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-semplicita text-5xl lg:text-6xl font-light text-deep-black mb-6 leading-tight">
              Obras de Arte
            </h1>
            <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto justified-text">
              Catálogo completo de obras abstratas da artista plástica Simone Oliveira. Descubra pinturas exclusivas e arte contemporânea brasileira organizadas por coleções.
            </p>
          </div>

          {/* Filtros de Coleção */}
          <div className="flex justify-center flex-wrap gap-2 bg-gentle-green/10 p-2 rounded-2xl mb-12 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`py-3 px-6 rounded-xl font-helvetica font-medium text-sm transition-all duration-300 ${
                selectedCollection === null
                  ? 'bg-warm-terracotta text-soft-beige shadow-lg'
                  : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
              }`}
            >
              Todas as Obras
            </button>
            
            {/* Dropdown de Coleções */}
            <div className="relative">
              <button
                onClick={() => setShowCollections(!showCollections)}
                className={`py-3 px-6 rounded-xl font-helvetica font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  selectedCollection 
                    ? 'bg-warm-terracotta text-soft-beige shadow-lg' 
                    : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
                }`}
              >
                {selectedCollection 
                  ? `Coleção: ${collections.find(c => c.id === selectedCollection)?.name}`
                  : 'Coleções'
                }
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCollections ? 'rotate-180' : ''}`} />
              </button>
              
              {showCollections && (
                <div className="absolute top-full mt-2 left-0 bg-soft-beige shadow-lg rounded-xl border border-gentle-green/20 min-w-48 z-10">
                  {collections.map((collection) => (
                    <button
                      key={collection.id}
                      onClick={() => {
                        setSelectedCollection(collection.id);
                        setShowCollections(false);
                      }}
                      className={`w-full text-left py-3 px-4 font-helvetica font-medium text-sm transition-all duration-300 first:rounded-t-xl last:rounded-b-xl ${
                        selectedCollection === collection.id
                          ? 'bg-warm-terracotta text-soft-beige'
                          : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
                      }`}
                    >
                      {collection.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-4">
                {selectedCollection ? collections.find(c => c.id === selectedCollection)?.name : 'Acervo Completo'}
              </h2>
              <p className="font-helvetica text-deep-black/70 max-w-xl mx-auto">
                {selectedCollection 
                  ? `Obras da coleção ${collections.find(c => c.id === selectedCollection)?.name}`
                  : 'Descubra todas as obras da artista Simone Oliveira'
                }
              </p>
            </div>
            <ArtworkGrid collectionId={selectedCollection} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Artworks;
