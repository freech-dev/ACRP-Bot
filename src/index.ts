import { OceanBubble as client } from "./structs/oceanicbubble";
import * as dotenv from 'dotenv';
import config from '../config.json';
dotenv.config();

const OceanBubble = new client({auth: `Bot ${process.env.TOKEN}`,
gateway: { intents: [ 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'ALL' ]  }});

let db;

async function connectToDatabase() {
  try {
    db = await mysql.createConnection(config.dbConfig);
  } catch (error) {
    console.error("Failed to connect to the MySQL database:", error);
  }
}

connectToDatabase();

OceanBubble.connect();

export { db };