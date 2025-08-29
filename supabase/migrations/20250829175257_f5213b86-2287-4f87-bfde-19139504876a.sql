-- Add indexes to improve artwork query performance
CREATE INDEX IF NOT EXISTS idx_artworks_created_at ON artworks(created_at);
CREATE INDEX IF NOT EXISTS idx_artworks_collection_id ON artworks(collection_id);
CREATE INDEX IF NOT EXISTS idx_artworks_featured ON artworks(featured);

-- Add index for collections
CREATE INDEX IF NOT EXISTS idx_collections_created_at ON collections(created_at);

-- Add index for exhibitions  
CREATE INDEX IF NOT EXISTS idx_exhibitions_created_at ON exhibitions(created_at);
CREATE INDEX IF NOT EXISTS idx_exhibitions_status ON exhibitions(status);