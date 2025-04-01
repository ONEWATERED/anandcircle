
// This file is maintained for backward compatibility
// It re-exports all functions from the more focused utility files
// Consider updating imports in your components to use the new utility files directly

export {
  checkDatabaseConnection,
  ensureHttpProtocol,
  getHardeepProfileImage,
} from './database/databaseUtils';

export {
  saveSocialLinks,
  updatePersonalSocialLinks,
} from './social/socialLinks';

export {
  uploadImageToDatabase,
  updatePersonalProfilePhoto,
  saveResumeToDatabase,
} from './profile';
