const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("replay")
    .setDescription("Replay the currently playing track."),
  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return interaction.followUp("There is no song playing.");
    }

    queue.node.seek(0);

    return interaction
      .followUp("Replayed the current track. 🎵")
      .catch(console.error);
  },
};
