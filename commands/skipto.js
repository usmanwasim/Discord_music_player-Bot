const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skip to sertain track")
    .addNumberOption((option) => {
      return option
        .setName("index")
        .setDescription("TrackNumber to Skip To")
        .setMinValue(1)
        .setRequired(true);
    }),
  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return await interaction.followUp("There is nothing in the queue");
    }
    if (queue.size === 0) {
      return await interaction.followUp("Empty queue. 👾");
    }

    const index = interaction.options.getNumber("index", true) - 1;

    if (index < 0 || index > queue.size) {
      return await interaction.followUp("Invalid track number");
    }

    queue.node.skipTo(index);

    await interaction.followUp(`Skipped to track ${index + 1}`);
  },
};
