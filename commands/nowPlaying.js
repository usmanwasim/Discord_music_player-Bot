const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show the currently playing track."),

  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.followUp("There is no song playing.");
    }

    const track = queue.currentTrack;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${track.author}` })
      .setTitle(`${track.title} Nowplaying 🎵`)
      .setURL(`${track.url}`)
      .setThumbnail(`${track.thumbnail}`)
      .setDescription(`Played by: ${track.requestedBy.toString()}\n
        ${queue.node.createProgressBar()}`);

    return interaction
      .followUp({ ephemeral: true, embeds: [embed] })
      .catch(console.error);
  },
};
