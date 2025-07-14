
-- Adicionar campo featured nas artworks para marcar obras em destaque
ALTER TABLE public.artworks 
ADD COLUMN featured BOOLEAN DEFAULT FALSE;

-- Criar índice para melhor performance nas consultas de obras em destaque
CREATE INDEX idx_artworks_featured ON public.artworks(featured);

-- Criar função para limitar a 6 obras em destaque
CREATE OR REPLACE FUNCTION check_featured_artworks_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.featured = TRUE THEN
    -- Se já temos 6 obras em destaque, não permitir mais
    IF (SELECT COUNT(*) FROM artworks WHERE featured = TRUE) >= 6 THEN
      RAISE EXCEPTION 'Máximo de 6 obras podem estar em destaque';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para verificar o limite antes de inserir/atualizar
CREATE TRIGGER trigger_check_featured_limit
  BEFORE INSERT OR UPDATE ON public.artworks
  FOR EACH ROW
  EXECUTE FUNCTION check_featured_artworks_limit();
