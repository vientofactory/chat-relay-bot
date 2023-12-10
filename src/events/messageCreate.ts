import { Message } from "discord.js";
import { BotEvent } from "../types";
import axios from "axios";

const event: BotEvent = {
  name: "messageCreate",
  async execute(message: Message) {
    if (message.author.bot) return;
    if (message.channel.id === process.env.CHAT_CHANNEL) {
      let chatData = JSON.stringify({
        user: {
          name: message.author.globalName,
        },
        message: message.content,
      });
      axios.post(process.env.API_URI, chatData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  },
};

export default event;
