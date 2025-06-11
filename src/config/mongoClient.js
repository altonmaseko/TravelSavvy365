import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;

let client;
let db;

export async function connectToDB() {
  if (db) return db;

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: false, // only true if you're using self-signed certs
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
  return db;
}
