module.exports = async (client) => {
  const { Player } = require("discord-player");
  const player = new Player(client);
  await player.extractors.loadDefault();
  console.log(`✅ ${client.user.tag} is online`);
};
