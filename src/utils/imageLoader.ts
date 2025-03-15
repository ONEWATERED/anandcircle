
// This utility handles loading and saving profile images 

// Get profile image URL from localStorage
export const getProfileImage = (): string | null => {
  try {
    const profileImage = localStorage.getItem('profileImageUrl');
    console.log("Retrieved profile image from storage:", profileImage);
    
    if (profileImage) {
      return profileImage;
    }
    
    // Return default image if none is found in localStorage
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  } catch (error) {
    console.error("Error getting profile image:", error);
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  }
};

// Save profile image URL to localStorage
export const saveProfileImage = (url: string): void => {
  try {
    console.log("Saving profile image:", url);
    localStorage.setItem('profileImageUrl', url);
  } catch (error) {
    console.error("Error saving profile image:", error);
  }
};

// Clear profile image from localStorage
export const clearProfileImage = (): void => {
  localStorage.removeItem('profileImageUrl');
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
