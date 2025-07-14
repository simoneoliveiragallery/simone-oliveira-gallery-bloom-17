-- Create collections table
CREATE TABLE public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to collections" 
ON public.collections 
FOR SELECT 
USING (true);

-- Create policy for all operations (for admin)
CREATE POLICY "Allow all operations on collections" 
ON public.collections 
FOR ALL 
USING (true);

-- Add collection_id to artworks table
ALTER TABLE public.artworks 
ADD COLUMN collection_id UUID REFERENCES public.collections(id);

-- Create trigger for automatic timestamp updates on collections
CREATE TRIGGER update_collections_updated_at
BEFORE UPDATE ON public.collections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Remove exhibition_id from artworks since exhibitions are being removed
ALTER TABLE public.artworks 
DROP COLUMN exhibition_id;