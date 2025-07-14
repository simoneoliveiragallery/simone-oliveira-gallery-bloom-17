
-- Criar tabela para obras de arte
CREATE TABLE public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  year TEXT NOT NULL,
  medium TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para exposições
CREATE TABLE public.exhibitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  image TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('current', 'upcoming', 'past')),
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para configurações administrativas
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir a senha de administrador
INSERT INTO public.admin_settings (key, value) 
VALUES ('admin_password', '@Simoneoliveiragallery18162025');

-- Inserir dados iniciais de exemplo para obras de arte
INSERT INTO public.artworks (title, image, year, medium, description) VALUES
('Reflexões Urbanas', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800', '2024', 'Óleo sobre tela', 'Uma exploração profunda dos contrastes da vida urbana moderna.'),
('Movimento Azul', 'https://images.unsplash.com/photo-1594736797933-d0d6a5d80b62?w=600&h=800', '2023', 'Acrílica sobre tela', 'Uma dança de tons azuis que captura a fluidez do movimento natural.'),
('Geometrias Orgânicas', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800', '2024', 'Técnica mista', 'Um diálogo entre formas geométricas e elementos naturais.'),
('Horizontes Abstratos', 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800', '2023', 'Óleo sobre tela', 'Paisagens reimaginadas através de uma perspectiva contemporânea.');

-- Inserir dados iniciais de exemplo para exposições
INSERT INTO public.exhibitions (title, description, start_date, end_date, image, status, location) VALUES
('Reflexões da Modernidade', 'Uma exploração profunda das tensões urbanas através de pintura e técnica mista contemporânea.', '2024-01-15', '2024-03-30', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600', 'current', 'Galeria Nacional de Arte, São Paulo'),
('Geometrias Orgânicas', 'Um diálogo entre formas geométricas e elementos naturais em uma coleção única de obras.', '2024-02-01', '2024-04-15', 'https://images.unsplash.com/photo-1594736797933-d0d6a5d80b62?w=800&h=600', 'current', 'Centro Cultural Vila Madalena'),
('Cores do Futuro', 'Uma visão inovadora sobre o uso da cor na arte contemporânea brasileira.', '2024-05-01', '2024-07-15', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600', 'upcoming', 'Museu de Arte Moderna, Rio de Janeiro');

-- Criar índices para melhor performance
CREATE INDEX idx_artworks_created_at ON public.artworks(created_at DESC);
CREATE INDEX idx_exhibitions_status ON public.exhibitions(status);
CREATE INDEX idx_exhibitions_dates ON public.exhibitions(start_date, end_date);
CREATE INDEX idx_admin_settings_key ON public.admin_settings(key);

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para atualizar automaticamente o updated_at
CREATE TRIGGER update_artworks_updated_at BEFORE UPDATE ON public.artworks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exhibitions_updated_at BEFORE UPDATE ON public.exhibitions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON public.admin_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS) para as tabelas
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para permitir leitura pública (para visualização no site)
CREATE POLICY "Allow public read access to artworks" ON public.artworks
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to exhibitions" ON public.exhibitions
    FOR SELECT USING (true);

-- Política mais restritiva para configurações administrativas (apenas leitura da senha)
CREATE POLICY "Allow public read access to admin settings" ON public.admin_settings
    FOR SELECT USING (key = 'admin_password');

-- Políticas para permitir modificações completas (para uso na área administrativa)
-- Nota: Em produção, essas políticas deveriam ser mais restritivas com autenticação adequada
CREATE POLICY "Allow all operations on artworks" ON public.artworks
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on exhibitions" ON public.exhibitions
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on admin settings" ON public.admin_settings
    FOR ALL USING (true) WITH CHECK (true);
