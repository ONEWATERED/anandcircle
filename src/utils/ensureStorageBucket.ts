
import { supabase } from '@/integrations/supabase/client';

export const ensureConnectionImagesBucket = async () => {
  try {
    // Check if bucket exists
    const { data: bucketList, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('Error checking buckets:', bucketError);
      return false;
    }
    
    const bucketExists = bucketList.some(bucket => bucket.name === 'connection-images');
    
    if (!bucketExists) {
      console.log('Creating connection-images bucket');
      const { error: createError } = await supabase.storage.createBucket('connection-images', {
        public: true
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        return false;
      }
      
      console.log('connection-images bucket created successfully');
    } else {
      console.log('connection-images bucket already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
    return false;
  }
};
