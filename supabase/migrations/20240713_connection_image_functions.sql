
-- Function to store a connection image
CREATE OR REPLACE FUNCTION store_connection_image(p_person_id TEXT, p_image_path TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.connection_images (person_id, image_path, updated_at)
  VALUES (p_person_id, p_image_path, now())
  ON CONFLICT (person_id) DO UPDATE 
  SET image_path = p_image_path, updated_at = now();
EXCEPTION WHEN OTHERS THEN
  -- If there's no UNIQUE constraint on person_id, this is the fallback
  UPDATE public.connection_images 
  SET image_path = p_image_path, updated_at = now()
  WHERE person_id = p_person_id;
  
  -- If no rows were updated, insert a new record
  IF NOT FOUND THEN
    INSERT INTO public.connection_images (person_id, image_path)
    VALUES (p_person_id, p_image_path);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get a connection image
CREATE OR REPLACE FUNCTION get_connection_image(p_person_id TEXT)
RETURNS TABLE (image_path TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT ci.image_path
  FROM public.connection_images ci
  WHERE ci.person_id = p_person_id;
END;
$$ LANGUAGE plpgsql;

-- Create a unique constraint on person_id to ensure we can use ON CONFLICT
DO $$
BEGIN
  BEGIN
    ALTER TABLE public.connection_images ADD CONSTRAINT connection_images_person_id_key UNIQUE (person_id);
  EXCEPTION WHEN duplicate_table THEN
    -- Constraint already exists
  END;
END $$;
