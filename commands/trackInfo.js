const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trackinfo")
    .setDescription("Displaying information about the currently playing song")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        .setDescription(
          "Displaying information about the currently playing song"
        )
        .addNumberOption((option) =>
          option
            .setName("number")
            .setDescription("Query for specific song or url detail")
            .setRequired(true)
        )
    ),
  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });
    const queue = useQueue(interaction.guild.id);

    const index = interaction.options.getNumber("number", true) - 1;

    if (!queue) {
      return interaction.followUp("There is no song playing.");
    }

    if (index > queue.size || index < 0)
      return interaction.followUp("Provided track Index does not exist.");

    const track = queue.tracks.toArray()[index];

    if (!track) return interaction.followUp("The track was not found.");

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${track.author}` })
      .setTitle(`${track.title} Trackinfo 🎵`)
      .setURL(`${track.url}`)
      .setThumbnail(`${track.thumbnail}`)
      .setDescription(`~ Requested by: ${track.requestedBy.toString()}
        Duration: ${track.duration}
        Position in queue: ${index + 1}`);

    return interaction
      .followUp({ ephemeral: true, embeds: [embed] })
      .catch(console.error);
  },
};
