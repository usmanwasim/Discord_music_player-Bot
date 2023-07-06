const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("swap")
    .setDescription("Swap two tracks in the queue")
    .addNumberOption((option) => {
      return option
        .setName("first")
        .setDescription("The first track to swap")
        .setRequired(true);
    })
    .addNumberOption((option) => {
      return option
        .setName("second")
        .setDescription("The second track to swap")
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

    if (queue.size < 2)
      return interaction.followUp(
        "Need at least 2 songs in the queue to use this command."
      );

    const first = interaction.options.getNumber("first", true) - 1;
    const second = interaction.options.getNumber("second", true) - 1;

    if (first < 0 || first >= queue.size)
      return interaction.followUp("Provided `first` track index is not valid.");

    if (second < 0 || second >= queue.size)
      return interaction.followUp(
        "Provided `second` track index is not valid."
      );

    if (first === second)
      return interaction.followUp("The tracks are already in this position.");

    queue.node.swap(first, second);

    return interaction.followUp(
      `Track ${first + 1} & ${second + 1} has been swapped.`
    );
  },
};
