-- Add artist field to artworks table
ALTER TABLE public.artworks 
ADD COLUMN artist TEXT DEFAULT 'Simone Oliveira';

-- Update existing records to have the default artist
UPDATE public.artworks 
SET artist = 'Simone Oliveira' 
WHERE artist IS NULL;