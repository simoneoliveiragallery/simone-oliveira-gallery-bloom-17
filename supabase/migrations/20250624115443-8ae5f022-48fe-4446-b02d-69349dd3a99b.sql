
-- Adicionar campo exhibition_id na tabela artworks para relacionar obras com exposições
ALTER TABLE public.artworks 
ADD COLUMN exhibition_id UUID REFERENCES public.exhibitions(id);

-- Criar índice para melhor performance nas consultas
CREATE INDEX idx_artworks_exhibition_id ON public.artworks(exhibition_id);

-- Inserir algumas obras de exemplo associadas às exposições existentes
-- (Primeiro vamos verificar se existem exposições para associar)
INSERT INTO public.artworks (title, image, year, medium, description, dimensions, exhibition_id) 
SELECT 
  'Reflexões Urbanas', 
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800', 
  '2024', 
  'Óleo sobre tela', 
  'Uma exploração profunda dos contrastes da vida urbana moderna.',
  '120 x 80 cm',
  id
FROM public.exhibitions 
WHERE status = 'current' 
LIMIT 1;

INSERT INTO public.artworks (title, image, year, medium, description, dimensions, exhibition_id) 
SELECT 
  'Movimento Azul', 
  'https://images.unsplash.com/photo-1594736797933-d0d6a5d80b62?w=600&h=800', 
  '2023', 
  'Acrílica sobre tela', 
  'Uma dança de tons azuis que captura a fluidez do movimento natural.',
  '100 x 70 cm',
  id
FROM public.exhibitions 
WHERE status = 'current' 
LIMIT 1;

INSERT INTO public.artworks (title, image, year, medium, description, dimensions) VALUES
('Geometrias Orgânicas', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800', '2024', 'Técnica mista', 'Um diálogo entre formas geométricas e elementos naturais.', '90 x 120 cm'),
('Horizontes Abstratos', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800', '2023', 'Óleo sobre tela', 'Paisagens reimaginadas através de uma perspectiva contemporânea.', '150 x 100 cm');
