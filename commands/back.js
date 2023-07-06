const { useHistory } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("Replay the previous track."),

  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const history = useHistory(interaction.guildId);

    if (!history) {
      return interaction.followUp("History track is empty.👾");
    }
    if (history?.size === 0) {
      return interaction.followUp("Empty history queue. 👾");
    }

    history.previous();

    return interaction.followUp("Replayed the previous track. 🎵");
  },
};
