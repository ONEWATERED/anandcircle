
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
  // From databaseConnection.ts (was databaseUtils.ts)
  checkDatabaseConnection,
} from './databaseConnection';

export {
  // From socialLinksUtils.ts (was databaseUtils.ts)
  saveSocialLinks,
} from './socialLinksUtils';

export {
  // From profileUtils.ts (was databaseUtils.ts)
  uploadImageToDatabase,
} from './profileUtils';
