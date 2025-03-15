
-- Ensure we have a bucket for connection images
INSERT INTO storage.buckets (id, name, public)
VALUES ('connection_images', 'connection_images', true)
ON CONFLICT (id) DO NOTHING;

-- Ensure we have the correct RLS policies
DROP POLICY IF EXISTS "Anyone can view connection images" ON public.connection_images;
CREATE POLICY "Anyone can view connection images"
  ON public.connection_images
  FOR SELECT
  USING (true);

-- Ensure unique constraint on person_id
ALTER TABLE public.connection_images 
  DROP CONSTRAINT IF EXISTS connection_images_person_id_key;
  
ALTER TABLE public.connection_images 
  ADD CONSTRAINT connection_images_person_id_key 
  UNIQUE (person_id);
