import { MongoClient } from 'https://deno.land/x/mongo@v0.12.1/mod.ts';
const connectionString = "mongodb+srv://qasimmehdi:abacus%40123@cluster0.gjeha.mongodb.net/ems?retryWrites=true&w=majority";

const client = new MongoClient();
client.connectWithUri(connectionString);
const db = client.database('ems');
export default db;