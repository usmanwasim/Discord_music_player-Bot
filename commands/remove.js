const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove the track from queue")
    .addNumberOption((option) =>
      option
        .setName("index")
        .setDescription("The track index to remove")
        .setRequired(true)
    ),
  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.followUp("There is no song playing.");
    }

    const index = interaction.options.getNumber("index", true) - 1;

    if (index > queue.size || index < 0)
      return interaction.followUp("Provided track Index does not exist.");

    queue.node.remove(index);

    return interaction.followUp(`Removed track ${index + 1}`);
  },
};
