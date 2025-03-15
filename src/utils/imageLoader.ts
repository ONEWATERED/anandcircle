// This utility handles loading and saving profile images 

// Get profile image URL from localStorage or database
export const getProfileImage = async (): Promise<string | null> => {
  try {
    // First check localStorage (temporary solution until DB integration is complete)
    const profileImage = localStorage.getItem('profileImageUrl');
    console.log("Retrieved profile image from storage:", profileImage);
    
    if (profileImage) {
      return profileImage;
    }
    
    // TODO: Implement database fetch when DB is connected
    // This would be where we'd fetch from a database instead
    
    // Return default image if none is found
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  } catch (error) {
    console.error("Error getting profile image:", error);
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  }
};

// Save profile image URL to localStorage and eventually database
export const saveProfileImage = async (url: string): Promise<void> => {
  try {
    console.log("Saving profile image:", url);
    
    // Save to localStorage for now
    localStorage.setItem('profileImageUrl', url);
    
    // TODO: Implement database save when DB is connected
    // This is where we'd save to a database instead
  } catch (error) {
    console.error("Error saving profile image:", error);
  }
};

// Clear profile image from localStorage
export const clearProfileImage = (): void => {
  localStorage.removeItem('profileImageUrl');
  // TODO: Remove from database when DB is connected
};

// Check if an image URL is valid
export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');
    return response.ok && contentType ? contentType.startsWith('image/') : false;
  } catch (error) {
    console.error('Error validating image URL:', error);
    return false;
  }
};

// Convert uploaded file to data URL for storage
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Create a function to handle database uploads when implemented
export const uploadImageToDatabase = async (imageFile: File): Promise<string> => {
  try {
    // This is a placeholder for future database implementation
    // For now, we'll convert to data URL and store locally
    const dataUrl = await fileToDataUrl(imageFile);
    await saveProfileImage(dataUrl);
    return dataUrl;
  } catch (error) {
    console.error("Error uploading image to database:", error);
    throw error;
  }
};

// Get all user profile data including social links
export const getUserProfileData = async () => {
  try {
    // This is where we would get user profile data from a database
    // For now, gather from localStorage
    const profileImage = localStorage.getItem('profileImageUrl');
    const linkedInUrl = localStorage.getItem('linkedInUrl') || 'https://linkedin.com/in/hardeepanand';
    const twitterUrl = localStorage.getItem('twitterUrl') || 'https://twitter.com/hardeepanand';
    const youtubeUrl = localStorage.getItem('youtubeUrl') || 'https://youtube.com/@hardeepanand';
    const spotifyUrl = localStorage.getItem('spotifyUrl') || 'https://open.spotify.com/user/hardeepanand';
    const anandCircleUrl = localStorage.getItem('anandCircleUrl') || '#anand-circle';
    
    return {
      profileImage,
      socialLinks: {
        linkedIn: linkedInUrl,
        twitter: twitterUrl,
        youtube: youtubeUrl,
        spotify: spotifyUrl,
        anandCircle: anandCircleUrl
      }
    };
  } catch (error) {
    console.error("Error getting user profile data:", error);
    return null;
  }
};

// Save user social media links
export const saveSocialLinks = (links: {
  linkedIn?: string;
  twitter?: string;
  youtube?: string;
  spotify?: string;
  anandCircle?: string;
}): void => {
  try {
    // Save each link to localStorage
    if (links.linkedIn) localStorage.setItem('linkedInUrl', links.linkedIn);
    if (links.twitter) localStorage.setItem('twitterUrl', links.twitter);
    if (links.youtube) localStorage.setItem('youtubeUrl', links.youtube);
    if (links.spotify) localStorage.setItem('spotifyUrl', links.spotify);
    if (links.anandCircle) localStorage.setItem('anandCircleUrl', links.anandCircle);
    
    // TODO: Save to database when connected
  } catch (error) {
    console.error("Error saving social links:", error);
  }
};
