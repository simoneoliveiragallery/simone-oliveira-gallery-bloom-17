import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const Artists = () => {
  return <div className="min-h-screen bg-soft-beige">
    {/* Dados Estruturados Schema.org para Pessoa */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Simone Oliveira",
        "jobTitle": "Artista Visual",
        "description": "Artista plástica brasileira especializada em arte contemporânea, com mais de 20 anos de carreira e 50+ obras criadas",
        "url": "https://simone-oliveira-art.lovable.app/artists",
        "image": "/lovable-uploads/1730db82-b48a-4890-a40a-92dcfb123144.png",
        "birthPlace": {
          "@type": "Place",
          "name": "São Paulo, Brasil"
        },
        "alumniOf": {
          "@type": "Organization",
          "name": "Universidade de São Paulo",
          "department": "Artes Visuais"
        },
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Artista Visual",
          "occupationalCategory": "Arte Contemporânea"
        },
        "knowsAbout": ["Arte Contemporânea", "Pintura Abstrata", "Técnicas Mistas", "Arte Brasileira"]
      })
    }} />
    <Navigation />

    {/* Header */}
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 gradient-elegant">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-semplicita text-5xl md:text-6xl font-light text-deep-black mb-6 fade-in">
          Sobre Simone Oliveira
        </h1>
        <p className="font-helvetica text-xl text-deep-black/80 max-w-3xl mx-auto leading-relaxed slide-up justified-text text-center">Conheça a trajetória, inspirações e processo criativo de artistas do cenário nacional, cujas obras tocam a alma e despertam.</p>
      </div>
    </section>

    {/* Artist Profile */}
    <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-warm-terracotta/20 to-light-blue/20 rounded-3xl transform rotate-3"></div>
            <img src="/lovable-uploads/1730db82-b48a-4890-a40a-92dcfb123144.png" alt="Simone Oliveira - Artista Plástica Brasileira de Arte Contemporânea e Pintura Abstrata" className="relative w-full h-[600px] object-cover rounded-3xl shadow-elegant hover-lift-elegant" />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-semplicita text-4xl font-light text-deep-black mb-4 py-[25px]">
                Simone Oliveira
              </h2>
              <p className="art-gallery-tag text-warm-terracotta text-lg mb-6">
                Artista Visual
              </p>

              <div className="space-y-4 text-deep-black/80 leading-relaxed">
                <p className="font-helvetica justified-text">Nascida em Minas Gerais, Simone Oliveira desenvolvi minha paixão pela arte desde muito jovem. Especializada em Artes Visuais pela Universidade de São Paulo, me dediquei à exploração de técnicas mistas que combinam tradição e inovação contemporânea.</p>

                <p className="font-helvetica justified-text">Minhas obras refletem uma conexão, explorando emoção, identidade e transformação pessoal através de uma linguagem visual única que mescla cores vibrantes com formas expressivas e texturas envolventes.</p>

                <p className="font-helvetica justified-text">Com mais de 8 coleções temáticas criadas e obras em coleções privadas por todo o Brasil, continuo a expandir meus limites de sua expressão artística, sempre buscando novas formas de conectar-me com meu público através da arte.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">50+</div>
                <div className="font-helvetica text-sm text-deep-black/70">Obras Criadas</div>
              </div>
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">8</div>
                <div className="font-helvetica text-sm text-deep-black/70">Coleções</div>
              </div>
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">20+</div>
                <div className="font-helvetica text-sm text-deep-black/70">Anos de Carreira</div>
              </div>
              <div className="text-center p-6 bg-gentle-green/20 rounded-xl shadow-lg">
                <div className="font-semplicita text-3xl font-light text-warm-terracotta mb-2">25+</div>
                <div className="font-helvetica text-sm text-deep-black/70">Colecionadores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Artist at Work Section */}
    <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-gentle-green/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-semplicita text-4xl font-light text-deep-black mb-6">
            Processo Criativo
          </h2>
          <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto justified-text text-center">O processo criativo da artista plástica Simone é fundamentado em três pilares essenciais que orientam cada obra, que confere às suas criações uma identidade única, sensível e conectada com o observador.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
              <img src="/lovable-uploads/e06b8e32-b139-4ac9-9789-dd2d68767dca.png" alt="Simone Oliveira pintando em seu ateliê - Processo criativo de arte contemporânea" className="w-full h-auto object-contain rounded-xl" />
            </div>
            <div className="text-center">
              <h3 className="font-semplicita text-lg font-light text-deep-black">Intuição Emocional</h3>
              <p className="font-helvetica text-sm text-deep-black/70">O ponto de partida é sempre o sentir</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
              <img src="/lovable-uploads/79f14aaa-ddef-4045-8d3e-50714c9dc43b.png" alt="Simone Oliveira explorando técnicas mistas em seu ateliê de arte contemporânea" className="w-full h-auto object-contain rounded-xl" />
            </div>
            <div className="text-center">
              <h3 className="font-semplicita text-lg font-light text-deep-black">Exploração Matérica</h3>
              <p className="font-helvetica text-sm text-deep-black/70">A textura é linguagem</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gentle-green/20 rounded-2xl p-4 shadow-lg hover-lift-elegant">
              <img src="/lovable-uploads/03348f07-97c9-429b-a76d-774e1979a3e4.png" alt="Simone Oliveira com pincéis e materiais de pintura abstrata" className="w-full h-auto object-contain rounded-xl" />
            </div>
            <div className="text-center">
              <h3 className="font-semplicita text-lg font-light text-deep-black">Narrativa Silenciosa</h3>
              <p className="font-helvetica text-sm text-deep-black/70">A arte como espaço de contemplação</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-soft-beige">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-warm-terracotta to-warm-terracotta/80 rounded-2xl p-12 text-center text-soft-beige">
          <h2 className="font-semplicita text-3xl md:text-4xl font-light mb-4">
            Interessado em uma Obra?
          </h2>

            <p className="font-helvetica text-lg mb-8 opacity-90 max-w-2xl mx-auto justified-text">
              Entre em contato para conhecer as obras disponíveis ou encomendar uma peça personalizada
              que reflita sua sensibilidade e estilo únicos.
            </p>
            <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-soft-beige text-warm-terracotta font-helvetica font-medium rounded-full hover:bg-gentle-green/20 transition-all duration-300">
              Entre em Contato
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
    </section>

    <Footer />
  </div>;
};
export default Artists;