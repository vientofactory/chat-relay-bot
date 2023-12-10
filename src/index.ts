import "dotenv/config";
import { BotClient } from "./bot";

const token = process.env.BOT_TOKEN;
const apiUri = process.env.API_URI;
const status = process.env.BOT_PRESENCE_NAME;
if (!token || !apiUri || !status) {
  throw new Error("Environment variable is missing.");
}

new BotClient(token).start();
