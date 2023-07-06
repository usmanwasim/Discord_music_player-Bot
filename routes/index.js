var express = require("express");
var router = express.Router();
const path = require("path");
const { CommandHandler } = require("djs-commander");
const { Client, GatewayIntentBits } = require("discord.js");

const { TOKEN, API_KEY, API_PUBLIC } = process.env;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

new CommandHandler({
  client,
  eventsPath: path.join(__dirname, "../events"),
  commandsPath: path.join(__dirname, "../commands"),
});

// client.player = new Player(client, {
//   ytdlOptions: {
//     quality: "highestaudio",
//     highWaterMark: 1 << 25,
//   },
// });

// EVENTS TRIGGERS & HANDLERS RUNS EVERY TIME THE BOT IS ONLINE
// client.on("ready", (c) => {
//   console.log(`✅ ${c.user.tag} is online`);
// });
// client.on("messageCreate", async (message) => {
//   // Prevent bot to self reply even if it replay as same as message.content
//   // if (message.author.bot) return;
//   if (message.content === "hello") {
//     // message & reply are same then it cause the recursion
//     message.reply("Hi!");
//   }
// });

// GET Route

client.login(TOKEN);

// COMMAND HANDLERS
// client.on("interactionCreate", (interaction) => {
//   if (interaction.isChatInputCommand()) {
//     if (interaction.commandName === "ping") {
//       interaction.reply("Pong!");
//     }
//   }
// });

router.get("/bot", async function (req, res, next) {
  res.send("Hello World!");
});

module.exports = router;
