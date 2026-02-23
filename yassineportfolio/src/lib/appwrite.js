import { Client, Databases, ID, Storage, Account, Query } from "appwrite";

const client = new Client();

// Validate required environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionMessages = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGES;
const collectionUsers = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS;
const adminUserId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_USER_ID;

if (
  !endpoint ||
  !projectId ||
  !databaseId ||
  !collectionMessages ||
  !collectionUsers ||
  !adminUserId
) {
  throw new Error(
    "Missing required Appwrite environment variables. Please check your .env file.",
  );
}

client.setEndpoint(endpoint).setProject(projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export const IDGenerator = ID;
export const QueryBuilder = Query;

// Database constants
export const DATABASE_ID = databaseId;
export const COLLECTION_MESSAGES = collectionMessages;
export const COLLECTION_USERS = collectionUsers;

// Admin user ID (your user ID)
export const ADMIN_USER_ID = adminUserId;

export default client;
