
// Main export file that re-exports all functions from the smaller modules
// This maintains backward compatibility with existing imports

export {
  // From profile/profileImage.ts
  getProfileImage,
  saveProfileImage,
} from './profile/profileImage';

export {
  // From profile/profileData.ts
  getUserProfileData,
} from './profile/profileData';

export {
  // From connection/connectionImage.ts
  getConnectionImage,
  saveConnectionImage,
} from './connection/connectionImage';

export {
  // From fileUtils.ts
  isValidImageUrl,
  fileToDataUrl,
  uploadImageToStorage,
} from './fileUtils';

export {
  // From database/databaseUtils.ts
  checkDatabaseConnection,
  ensureHttpProtocol,
  getHardeepProfileImage,
} from './database/databaseUtils';

export {
  // From social/socialLinks.ts
  saveSocialLinks,
  updatePersonalSocialLinks,
} from './social/socialLinks';

export {
  // From profile/imageUpload.ts and profile/profileUpdate.ts
  uploadImageToDatabase,
  updatePersonalProfilePhoto,
  saveResumeToDatabase,
} from './profile';
