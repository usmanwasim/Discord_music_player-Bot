const { SlashCommandBuilder, MessageEmbed } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause the playback"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: true });
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return interaction.followUp("There is nothing in the queue");
    }
    if (queue.node.isPaused())
      return interaction.followUp("The playback is already paused.");

    await queue.node.pause();

    return interaction.followUp(`Paused the playback! ⏸️`);
  },
};
