import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";
import consola from "consola";

module.exports = (client: Client) => {
  const eventsDir = join(__dirname, "../events");
  readdirSync(eventsDir).forEach((file) => {
    if (file.endsWith(".js")) {
      try {
        const event: BotEvent = require(`${eventsDir}/${file}`).default;
        event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
        consola.info(`Loaded Event Handler: ${event.name}`);
      } catch (e) {
        consola.error(e);
      }
    }
  });
};
