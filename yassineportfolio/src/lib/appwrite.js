import { Client, Databases, ID, Storage, Account, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("698e521c0012d203561b");

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export const IDGenerator = ID;
export const QueryBuilder = Query;

// Database constants
export const DATABASE_ID = "698e53a50001ce888b8f";
export const COLLECTION_MESSAGES = "messages";
export const COLLECTION_USERS = "users"; // You need to create this collection

// Admin user ID (your user ID)
export const ADMIN_USER_ID = "698e72590009ce7f5067"; // Replace with your actual Appwrite user ID

export default client;