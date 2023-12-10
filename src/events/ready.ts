import { Client, ActivityType } from "discord.js";
import { BotEvent } from "../types";
import consola from "consola";

const event: BotEvent = {
  name: "ready",
  once: true,
  async execute(client: Client) {
    consola.ready({
      message: `Logged in as ${client.user?.tag}`,
      badge: true,
    });
    const users = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    consola.info(`In ${client.guilds.cache.size} guilds, ${users} users.`);
    client.user?.setPresence({
      activities: [{ name: process.env.BOT_PRESENCE_NAME, type: ActivityType.Playing }],
      status: "online",
    });
  },
};

export default event;
