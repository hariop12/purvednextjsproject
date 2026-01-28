import { Client, Databases, Storage, ID, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

// ✅ DATABASE
export const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// ✅ COLLECTIONS
export const CONTACT_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_CONTACT_COLLECTION_ID;

export const JOB_APPLICATIONS_COLLECTION = import.meta.env
  .VITE_APPWRITE_JOB_APPLICATIONS_COLLECTION_ID;

// ✅ STORAGE BUCKET
export const JOB_CV_BUCKET_ID = import.meta.env.VITE_APPWRITE_JOB_CV_BUCKET_ID;
export const BLOGS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_BLOGS_COLLECTION_ID;

export { ID };
