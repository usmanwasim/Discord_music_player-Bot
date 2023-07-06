const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the Queue"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: true });
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.followUp("There is nothing in the queue");
    }

    if (queue.size < 3) {
      return interaction.followUp(
        "Need at least 3 tracks in the queue to shuffle."
      );
    }

    queue.tracks.shuffle();

    return interaction.followUp("Shuffled the queue.🔀").catch(console.error);
  },
};
