
/**
 * Utilities for managing profile data in localStorage
 */

/**
 * Stores a profile part in localStorage with error handling
 */
export const storeProfilePartInLocalStorage = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error(`Error storing ${key} in localStorage:`, e);
    return false;
  }
};

/**
 * Store profile parts individually in localStorage
 */
export const storeProfilePartsInLocalStorage = (profile: any): boolean => {
  try {
    // Save critical elements individually
    if (profile.photo_url) {
      localStorage.setItem('profileImageUrl', profile.photo_url);
    }
    if (profile.resume_url) {
      localStorage.setItem('resumeUrl', profile.resume_url);
    }
    
    // Save social links individually
    if (profile.socialLinks) {
      Object.entries(profile.socialLinks).forEach(([platform, url]) => {
        const key = platformToStorageKey(platform);
        if (key && typeof url === 'string') {
          localStorage.setItem(key, url);
        }
      });
    }
    return true;
  } catch (e) {
    console.error('Error storing profile parts:', e);
    return false;
  }
};

/**
 * Convert platform names to localStorage keys
 */
export const platformToStorageKey = (platform: string): string | null => {
  const map: Record<string, string> = {
    'linkedin': 'linkedInUrl',
    'twitter': 'twitterUrl',
    'youtube': 'youtubeUrl',
    'spotify': 'spotifyUrl',
    'anandcircle': 'anandCircleUrl'
  };
  return map[platform.toLowerCase()] || null;
};

/**
 * Clear all localStorage except for specified keys
 */
export const clearAllLocalStorageExcept = (keysToKeep: string[]): void => {
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !keysToKeep.includes(key)) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
};
