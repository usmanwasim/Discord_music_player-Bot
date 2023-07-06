const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue, useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("load song from youtube")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("load a single song from youtube")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Query for song or url")
            .setRequired(true)
        )
    ),
  //
  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: true });

    const player = useMasterPlayer();
    const queue = useQueue(interaction.guild.id);
    const channel = interaction.member?.voice?.channel;

    if (!channel)
      return interaction.followUp("You have to join a voice channel first.");

    if (queue && queue.channel.id !== channel.id)
      return interaction.followUp(
        "I'm already playing in a different voice channel!"
      );

    if (!channel.viewable)
      return interaction.followUp("I need `View Channel` permission.");

    if (!channel.joinable)
      return interaction.followUp("I need `Connect Channel` permission.");

    if (channel.full)
      return interaction.followUp("Can't join, the voice channel is full.");

    if (interaction.member.voice.deaf)
      return interaction.followUp(
        "You cannot run this command while deafened."
      );

    if (interaction.guild.members.me?.voice?.mute)
      return interaction.followUp("Please unmute me before playing.");

    try {
      const query = interaction.options.getString("query", true);

      const searchResult = await player
        .search(query, { requestedBy: interaction.user })
        .catch(() => null);

      if (!searchResult?.hasTracks())
        return interaction.followUp(`No track was found for ${query}!`);

      const { track } = await player.play(channel, searchResult, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction, // we can access this metadata object using queue.metadata later on
        },
      });

      const Embed = new EmbedBuilder()
        .setDescription(
          `**${track?.title}-${track.author} [${track.url}]** has been added to the Queue`
        )
        .setThumbnail(track.thumbnail)
        .setFooter({
          text: `Duration: ${track.duration} `,
        });

      return interaction
        .followUp({ ephemeral: true, embeds: [Embed] })
        .catch(console.error);
    } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
