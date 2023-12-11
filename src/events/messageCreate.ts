import { Message } from "discord.js";
import { BotEvent } from "../types";
import axios from "axios";

const event: BotEvent = {
  name: "messageCreate",
  async execute(message: Message) {
    if (message.author.bot) return;
    if (message.channel.id === process.env.CHAT_CHANNEL) {
      const username = message.author.globalName ? message.author.globalName : message.author.username;
      let chatData = {
        user: {
          name: username,
        },
        message: "",
      };
      if (message.attachments.size > 0) {
        Object.assign(chatData, {
          message: "(첨부파일)",
        });
      } else {
        Object.assign(chatData, {
          message: message.content,
        });
      }
      const body = JSON.stringify(chatData);
      axios.post(process.env.API_URI, body, {
        headers: {
          secret: process.env.SECRET_KEY,
          "Content-Type": "application/json",
        },
      });
    }
  },
};

export default event;
