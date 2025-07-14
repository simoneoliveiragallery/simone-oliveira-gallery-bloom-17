-- Adicionando obras que não existem ainda

-- Verificando se Sombras existe e inserindo se não existir
INSERT INTO artworks (title, medium, dimensions, description, artist, year, image)
SELECT 'Sombras', 'Acrílica sobre tela e espatulado', '1,00 x 0,70', 'Entre a escuridão surge a luz trazendo vida.', 'Simone Oliveira', '2024', '/placeholder-artwork.jpg'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE title = 'Sombras');

-- Verificando se Esculpida em Desejo existe e inserindo se não existir
INSERT INTO artworks (title, medium, dimensions, description, artist, year, image)
SELECT 'Esculpida em Desejo', 'Acrílico sobre tela, espatulado e folhas de ouro', '1,0 x 1,0', 'Inspirada em uma imagem real de uma mulher redesenhada entre a arte médica e a arte plástica.', 'Simone Oliveira e Daiane Medeiros', '2025', '/placeholder-artwork.jpg'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE title = 'Esculpida em Desejo');

-- Verificando se Intuição existe e inserindo se não existir
INSERT INTO artworks (title, medium, dimensions, description, artist, year, image)
SELECT 'Intuição', 'Acrílica sobre tela', '1,00 x 0,70', 'Criada a quatro mãos, Intuição é uma obra que transborda presença e sensibilidade. Através da espátula e da força feminina, Simone e Daiane traduzem em textura o que só se sente: o poder silencioso de quem sabe, mesmo sem ser.', 'Simone Oliveira e Daiane Medeiros', '2025', '/placeholder-artwork.jpg'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE title = 'Intuição');

-- Verificando se Curva Selvagem existe e inserindo se não existir
INSERT INTO artworks (title, medium, dimensions, description, artist, year, image)
SELECT 'Curva Selvagem', 'Acrílica sobre tela e espatulado.', '1,0 x 0,70', 'A força do feminino, o movimento do corpo e a liberdade de expressão com um toque provocante e sofisticado. A composição explora o corpo feminino com expressividade e vigor, revelando camadas de cor, movimento e emoção.', 'Simone Oliveira e Daiane Medeiros', '2025', '/placeholder-artwork.jpg'
WHERE NOT EXISTS (SELECT 1 FROM artworks WHERE title = 'Curva Selvagem');