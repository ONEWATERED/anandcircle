
// This utility handles loading and saving profile images 

// Get profile image URL from localStorage
export const getProfileImage = (): string | null => {
  return localStorage.getItem('profileImageUrl');
};

// Save profile image URL to localStorage
export const saveProfileImage = (url: string): void => {
  localStorage.setItem('profileImageUrl', url);
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
