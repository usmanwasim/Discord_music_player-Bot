module.exports = {
  data: {
    name: "ping",
    description: "Reply with pong!",
  },
  run: ({ interaction }) => {
    interaction.reply("Pong!");
  },
};
