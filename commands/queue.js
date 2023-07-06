const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the first 5 song in the queue")
    .addNumberOption((option) =>
      option.setName("page").setDescription("Page number").setMinValue(1)
    ),

  run: async ({ interaction }) => {
    await interaction.deferReply({ ephemeral: true });

    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.followUp("There is no track in the queue.");

    if (queue.size === 0) {
      return interaction.followUp("Empty queue. 👾");
    }

    let page = interaction.options.getNumber("page", false) ?? 1;

    const multiple = 5;

    const maxPages = Math.ceil(queue.size / multiple);

    if (page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.tracks.toArray().slice(start, end);

    const embed = new EmbedBuilder()
      .setDescription(
        `${tracks
          ?.map(
            (track, i) =>
              `${start + ++i} : ${track?.title}-${track?.author} (${
                track?.url
              }) presented by ${track?.requestedBy.toString()}`
          )
          .join("\n")}`
      )
      .setFooter({
        text: `Page ${page} of ${maxPages} | track ${start + 1} to ${
          end > queue?.size ? `${queue?.size}` : `${end}`
        } of ${queue?.size}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    return interaction
      .followUp({ ephemeral: true, embeds: [embed] })
      .catch(console.error);
  },
};
