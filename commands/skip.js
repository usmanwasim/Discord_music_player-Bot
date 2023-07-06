const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),
  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return await interaction.editReply("There is nothing in the queue");
    }

    queue.node.skip();

    await interaction.followUp("Skiped the current track.❎");
  },
};
