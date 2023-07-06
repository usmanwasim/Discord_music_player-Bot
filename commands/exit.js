const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Exit the Voice Channel"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: true });
    const queue = useQueue(interaction.guild.id);
    if (!queue) {
      return await interaction.followUp("There is nothing in the queue");
    }
    queue?.delete();
    return interaction.followUp(
      "Player has been stopped, see you next time! ✅"
    );
  },
};
