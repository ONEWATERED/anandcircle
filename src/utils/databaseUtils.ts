
// This file is maintained for backward compatibility
// It re-exports all functions from the more focused utility files
// Consider updating imports in your components to use the new utility files directly

export {
  checkDatabaseConnection,
} from './databaseConnection';

export {
  saveSocialLinks,
  updatePersonalSocialLinks,
} from './socialLinksUtils';

export {
  uploadImageToDatabase,
  updatePersonalProfilePhoto,
  saveResumeToDatabase,
} from './profileUtils';
