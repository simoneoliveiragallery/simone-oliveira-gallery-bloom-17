import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Award, Users, Calendar, Heart, Palette, Eye, Target, Globe } from 'lucide-react';
const About = () => {
  const stats = [{
    icon: Calendar,
    number: "20+",
    label: "Anos de Experiência"
  }, {
    icon: Palette,
    number: "50+",
    label: "Obras Criadas"
  }, {
    icon: Eye,
    number: "8",
    label: "Coleções Criadas"
  }, {
    icon: Heart,
    number: "25+",
    label: "Colecionadores Alcançados"
  }];
  const galleryFeatures = [{
    icon: Target,
    title: "Nosso Objetivo",
    description: "Criar uma plataforma online elegante que sirva como vitrine oficial para as obras da artista, possibilitando o contato direto para negociações personalizadas e fortalecendo o vínculo humano por trás de cada peça."
  }, {
    icon: Globe,
    title: "Nossa Missão",
    description: "Oferecer uma experiência estética imersiva através de obras que transitam entre o abstrato e o impressionismo, refletindo a alma, as paisagens internas e os elementos naturais do Brasil."
  }, {
    icon: Palette,
    title: "Nossa Visão",
    description: "Ser reconhecida como um espaço de contemplação e conexão emocional, onde cada obra dialoga com quem observa por meio de cores, texturas e significados únicos."
  }];
  const websiteStructure = [{
    icon: "🏠",
    title: "Página Inicial",
    description: "Banner impactante, apresentação da artista e destaques das principais obras com chamada para explorar a galeria completa."
  }, {
    icon: "🖼",
    title: "Galeria de Obras",
    description: "Grade visual completa com detalhes de cada obra, incluindo técnica, dimensões e acesso direto à artista via WhatsApp."
  }, {
    icon: "👩‍🎨",
    title: "Sobre a Artista",
    description: "Biografia detalhada, inspirações, influências artísticas e linha do tempo com destaques da carreira de Simone."
  }, {
    icon: "📰",
    title: "Coleções e Imprensa",
    description: "Histórico de coleções, reportagens, entrevistas e reconhecimentos conquistados ao longo da trajetória artística."
  }, {
    icon: "📞",
    title: "Contato",
    description: "Formulário direto, informações de contato, redes sociais e localização do ateliê para visitações."
  }];
  return <div className="min-h-screen bg-soft-beige">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 gradient-elegant">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-semplicita text-4xl md:text-5xl lg:text-6xl font-light text-deep-black mb-6 fade-in">
            Sobre a Galeria
          </h1>
          <p className="font-helvetica text-lg md:text-xl text-deep-black/80 max-w-4xl mx-auto leading-relaxed slide-up">
            A Simone Oliveira Art Gallery é um espaço de arte contemporânea que nasce do olhar sensível 
            e da expressão singular da artista plástica Simone Oliveira.
          </p>
        </div>
      </section>

      {/* Gallery Presentation */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="slide-up">
              <div className="inline-flex items-center px-4 py-2 bg-warm-terracotta/10 rounded-full mb-6">
                <Palette size={16} className="mr-2 text-warm-terracotta" />
                <span className="font-helvetica text-sm font-medium text-warm-terracotta">Apresentação da Galeria</span>
              </div>
              
              <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-6 leading-tight">
                Mais que uma Galeria Virtual
              </h2>
              
              <div className="space-y-4 font-helvetica text-base text-deep-black/80 leading-relaxed">
                <p>
                  Trata-se de um ambiente de contemplação e conexão emocional, onde cada obra 
                  dialoga com quem observa — por meio de cores, texturas e significados.
                </p>
                <p>
                  A galeria oferece uma experiência estética imersiva, com obras que transitam 
                  entre o abstrato e o impressionismo, e que refletem a alma, as paisagens 
                  internas e os elementos naturais do Brasil.
                </p>
              </div>
            </div>
            
            <div className="fade-in" style={{
            animationDelay: '0.3s'
          }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-warm-terracotta/20 to-light-blue/20 rounded-2xl transform rotate-3"></div>
                <img src="/lovable-uploads/e06b8e32-b139-4ac9-9789-dd2d68767dca.png" alt="Simone Oliveira Art Gallery" className="relative w-full h-full object-cover rounded-2xl shadow-elegant hover-lift-elegant" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives and Mission */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gentle-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-4">
              Nossos Pilares
            </h2>
            <p className="font-helvetica text-lg text-deep-black/70 max-w-2xl mx-auto">
              Os fundamentos que guiam nossa galeria e definem nossa identidade artística
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryFeatures.map((feature, index) => <div key={index} className="bg-soft-beige/80 backdrop-blur-sm border border-gentle-green/30 rounded-2xl p-8 text-center hover-lift-elegant">
                <div className="w-16 h-16 bg-warm-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-warm-terracotta" size={24} />
                </div>
                <h3 className="font-semplicita text-xl font-light text-deep-black mb-4">
                  {feature.title}
                </h3>
                <p className="font-helvetica text-deep-black/70 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Website Structure */}
      

      {/* Stats */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gentle-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-4">
              Nossa Trajetória
            </h2>
            <p className="font-helvetica text-lg text-deep-black/70 max-w-2xl mx-auto">
              Números que refletem nossa dedicação à arte contemporânea
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-warm-terracotta to-warm-terracotta/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-soft-beige" size={28} />
                </div>
                <div className="font-semplicita text-2xl md:text-3xl font-light text-deep-black mb-2">{stat.number}</div>
                <div className="font-helvetica text-deep-black/70 text-sm">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* No Ateliê Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-4">
              No Ateliê
            </h2>
            <p className="font-helvetica text-lg text-deep-black/70 max-w-2xl mx-auto">
              Mergulhe no universo criativo da artista e conheça o processo por trás de cada obra
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Materiais de Arte */}
            <div className="group cursor-pointer flex justify-center">
              <div className="w-full overflow-hidden rounded-2xl shadow-elegant bg-soft-beige">
                <img
                  src="/lovable-uploads/3c77c27d-9ab8-402d-af0c-92914ecf2cd9.png"
                  alt="Materiais de arte - tintas e pincéis"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Artista Trabalhando */}
            <div className="group cursor-pointer flex justify-center">
              <div className="w-full overflow-hidden rounded-2xl shadow-elegant bg-soft-beige">
                <img
                  src="/lovable-uploads/ce237e42-1e57-4a47-84fb-9b4c8042dd96.png"
                  alt="Simone Oliveira pintando em seu ateliê"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Processo Criativo */}
            <div className="group cursor-pointer flex justify-center">
              <div className="w-full overflow-hidden rounded-2xl shadow-elegant bg-soft-beige flex items-center justify-center">
                <img
                  src="/lovable-uploads/46d52c97-6c40-4984-b6b2-229797103846.png"
                  alt="Processo criativo - aplicação de tinta"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Identity & Brand */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gentle-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-light-blue/20 rounded-full mb-6">
                <Award size={16} className="mr-2 text-warm-terracotta" />
                <span className="font-helvetica text-sm font-medium text-warm-terracotta">Identidade Visual</span>
              </div>
              
              <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-6">Direção da Arte</h2>
              
              <div className="space-y-4 font-helvetica text-deep-black/80 leading-relaxed">
                <p>A direção de arte da Simone Oliveira Art Gallery nasce da busca por uma experiência visual que seja tão sensível quanto a própria criação artística.</p>
                <p>Cada pintura é pensada para respirar: o espaço, o ritmo, o silêncio. A composição é leve, contemplativa, e convida o visitante a desacelerar o olhar, a entrar em contato com o tempo interno da obra e com sua própria percepção.</p>
                
              </div>
            </div>
            
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-warm-terracotta/10 rounded-full mb-6">
                <Users size={16} className="mr-2 text-warm-terracotta" />
                <span className="font-helvetica text-sm font-medium text-warm-terracotta">Posicionamento</span>
              </div>
              
              <h2 className="font-semplicita text-3xl lg:text-4xl font-light text-deep-black mb-6">
                Posicionamento
              </h2>
              
              <div className="space-y-4 font-helvetica text-deep-black/80 leading-relaxed">
                <p>
                  Simone Oliveira Art Gallery se posiciona como uma galeria de arte autoral e sensível, 
                  voltada a um público refinado que valoriza arte contemporânea com alma.
                </p>
                <p>
                  Seu foco está em proporcionar uma experiência estética profunda, onde a contemplação, 
                  o silêncio e a emoção são protagonistas.
                </p>
                <p>
                  É uma marca que une autenticidade artística e elegância visual, sendo referência para 
                  colecionadores, decoradores e apreciadores de arte com significado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;
