
// Main export file that re-exports all functions from the smaller modules
// This maintains backward compatibility with existing imports

export {
  // From profileImages.ts
  getProfileImage,
  getUserProfileData,
  saveProfileImage,
} from './profileImages';

export {
  // From connectionImages.ts
  getConnectionImage,
  saveConnectionImage,
} from './connectionImages';

export {
  // From fileUtils.ts
  isValidImageUrl,
  fileToDataUrl,
  uploadImageToStorage,
} from './fileUtils';

export {
  // From databaseUtils.ts
  checkDatabaseConnection,
  saveSocialLinks,
  uploadImageToDatabase,
} from './databaseUtils';
