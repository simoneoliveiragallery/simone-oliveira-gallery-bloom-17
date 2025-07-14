-- Atualizando dados das obras conforme especificado pelo usuário

-- Colheita Viva
UPDATE artworks SET 
  medium = 'Acrílica sobre tela, com espatulado e pinceladas expressivas, utilizamos camadas espessas de tinta aplicadas, criando volumes táteis que saltam aos olhos. O fundo aquecido em tons terrosos e dourados reforça o contraste com os verdes vivos e os alaranjados pulsantes dos frutos, evocando a energia solar e a fertilidade tropical.',
  dimensions = '1,00 x 0,70',
  description = 'Evoca o frescor, o ato de colher, o presente na natureza.',
  artist = 'Simone Oliveira e Daiane Medeiros'
WHERE title = 'Colheita Viva';

-- O Aroma da Manhã
UPDATE artworks SET 
  medium = 'Acrílica sobre tela, abstrato, orgânico, com uso de pinceladas amplas e gestuais para criar formas orgânicas e movimentos fluidos. Espatulado sutil em algumas áreas para dar textura e relevo. Mistura de cores diretamente na tela, criando transições suaves entre tons terrosos, beges e pretos.',
  dimensions = '1,00 x 0,70',
  description = 'Abstração com espirais e ondas em tons terrosos e dourados, representando o cheiro do café se espalhando no ar logo cedo.',
  artist = 'Simone Oliveira e Daiane Medeiros'
WHERE title = 'O Aroma da Manhã';

-- Grão em Movimento
UPDATE artworks SET 
  medium = 'Acrílica sobre tela',
  dimensions = '1,00 x 0,70',
  description = 'Pinceladas circulares em diferentes tons de marrom, do claro ao quase preto, sugerindo a energia contida em cada grão de café.',
  artist = 'Simone Oliveira e Daiane Medeiros'
WHERE title = 'Grão em Movimento';

-- Tecidos da Terra
UPDATE artworks SET 
  medium = 'Acrílica sobre tela e stencil',
  dimensions = '1,0 x 1,0',
  description = 'Tecidos da Terra é uma composição vibrante que costura a natureza em formas, cores e ritmos. Com sobreposições gráficas e símbolos botânicos e animais, a obra evoca um universo onde tudo pulsa, como se a própria terra tivesse bordado seus segredos em cor. Cogumelos, folhas, corais, libélulas e insetos emergem entre linhas e blocos, como fragmentos de uma memória ancestral da floresta.',
  artist = 'Simone Oliveira'
WHERE title = 'Tecidos da Terra';

-- Flor de Mim
UPDATE artworks SET 
  medium = 'Acrílica sobre tela, com aplicação de espátula para dar textura nas flores e no vestido, combinada com pinceladas soltas que definem o corpo e o fundo em estilo contemporâneo.',
  dimensions = '1,00 x 0,70',
  description = 'Expressa feminilidade, delicadeza e força, sugerindo que a mulher floresce a partir de si mesma.',
  artist = 'Simone Oliveira e Daiane Medeiros'
WHERE title = 'Flor de mim' OR title = 'Flor de Mim';

-- Ela Vale Ouro
UPDATE artworks SET 
  medium = 'Acrílica sobre tela',
  dimensions = '1,0 x 1,0',
  description = 'Celebra o corpo, a força feminina e a identidade sem rosto. Valoriza a mulher por inteiro, sem precisar mostrar.',
  artist = 'Simone Oliveira e Daiane Medeiros'
WHERE title = 'Ela Vale Ouro';

-- Fenda Verde
UPDATE artworks SET 
  medium = 'Acrílica sobre tela, pinceladas libres e camadas esbatidas.',
  dimensions = '1,00 x 0,70',
  description = 'Essa obra é um Díptico duas metades separadas por um vazio branco, com o verde pulsando ao redor. Um trabalho a quatro mãos.',
  artist = 'Simone Oliveira e Daiane Medeiros'
WHERE title = 'Fenda Verde';

-- Horizonte Dourado
UPDATE artworks SET 
  medium = 'Acrílica sobre tela com detalhes em folha de ouro',
  dimensions = '1,00 x 0,70',
  description = 'Uma linha sutil onde o silêncio encontra o luxo, e o minimalismo revela intensidade.',
  artist = 'Simone Oliveira'
WHERE title = 'Horizonte Dourado';

-- La Rouge
UPDATE artworks SET 
  medium = 'Acrílica sobre tela , espatulado',
  dimensions = '1,20 x 0,70',
  description = 'De costas, mas mesmo assim domina a cena. Envolta em vermelho, sua presença é uma afirmação silenciosa de poder, elegância e mistério. Um trabalho a quatro mãos.',
  artist = 'Simone Oliveira e Daiane Medeiros.'
WHERE title = 'La Rouge';

-- Solo Vivo
UPDATE artworks SET 
  medium = 'Acrílica sobre tela',
  dimensions = '1,50 x 1,00',
  description = 'Uma terra fértil, vida. Uma peça única, feia para quem valoriza o natural e o silêncio que fala.',
  artist = 'Simone Oliveira'
WHERE title = 'Solo Vivo';

-- Harmonia da Terra
UPDATE artworks SET 
  medium = 'Acrílica sobre tela',
  dimensions = '1,5 x 1,0',
  description = 'Esta obra nasceu entre pinceladas orgânicas e tons terrosos que remetem a força e à calma do solo. Durante o processo busquei traduzir a energia que vem da terra fértil. Suas cores, texturas e o ritmo natural da vida.',
  artist = 'Simone Oliveira'
WHERE title = 'Harmonia da Terra';

-- Força
UPDATE artworks SET 
  medium = 'Acrílica sobre tela/Abstracionismo.',
  dimensions = '1,30 x 1,00',
  description = 'Ela não pede espaço, ela toma. Entre sombras densas e azuis profundos, essa obra carrega o peso da emoção bruta e a beleza do que é indomável.',
  artist = 'Simone Oliveira'
WHERE title = 'Força';

-- Mergulho
UPDATE artworks SET 
  medium = 'Acrílica sobre tela',
  dimensions = '1,00 x 0,70',
  description = '"Mergulho" é uma pintura abstrata que evoca profundidade e introspecção. Compostas por camadas sobrepostas em tons oceânicos, as formas geométricas suaves se dissolvem em uma atmosfera líquida e contemplativa. A obra convida à pausa e à entrega como um mergulho interno, em busca de silêncio e clareza.',
  artist = 'Simone Oliveira'
WHERE title = 'Mergulho';

-- Chuva de Primavera
UPDATE artworks SET 
  medium = 'Acrílica sobre tela',
  dimensions = '1,00 x 0,70',
  description = 'Entre cores vibrantes e pinceladas instintivas, "Chuva de Primavera" floresce como um jardim em meio à tempestade. A obra celebra o renascimento, a força da natureza e a beleza que resiste mesmo nos dias nublados.',
  artist = 'Simone Oliveira'
WHERE title = 'Chuva de Primavera';

-- Imersão
UPDATE artworks SET 
  medium = 'Acrílica sobre tela de algodão, moldura de madeira pintada, espatulado',
  dimensions = '1,0 x 1,0',
  description = 'Composta por camadas intensas de azul e contrastes vibrantes, "Imersão" é uma obra que transforma qualquer ambiente, oferecendo profundidade, elegância e força visual. Criada para quem busca uma peça de impacto e sofisticação, esta tela convida o olhar a um movimento contínuo, uma verdadeira viagem sensorial. Versátil e atemporal, "Imersão" valoriza espaços contemporâneos clássicos, tornando-se um ponto focal em galerias, residências e ambientes corporativos. Uma obra que não apenas decora, mas provoca e inspira.',
  artist = 'Simone Oliveira'
WHERE title = 'Imersão';

-- Terra Dourada
UPDATE artworks SET 
  medium = 'Acrílica sobre tela e espatulado',
  dimensions = '1,50 x 0,90',
  description = 'Dourado que brota em camadas profundas da terra e emoção. Essa obra carrega textura, força e presença. Feita para transformar o espaço e tocar quem vê. Uma peça única nascida do silêncio e da intensidade.',
  artist = 'Simone Oliveira'
WHERE title = 'Terra Dourada';