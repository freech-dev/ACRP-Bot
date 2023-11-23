import { OceanBubble as client } from "./structs/oceanicbubble";
import * as dotenv from 'dotenv';
dotenv.config();

const OceanBubble = new client({auth: `Bot ${process.env.TOKEN}`,
gateway: { intents: [ 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'ALL' ]  }});

OceanBubble.connect();