const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the current song"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: true });
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.followUp("There is nothing in the queue");
    }

    queue.node.resume();

    return interaction
      .followUp(`Player has been resumed! ▶️`)
      .catch(console.error);
  },
};
