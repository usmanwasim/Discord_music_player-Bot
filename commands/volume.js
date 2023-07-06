const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Check or change the volume")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Volume amount to set")
        .setMinValue(1)
        .setMaxValue(200)
        .setRequired(true)
    ),
  run: async ({ interaction }) => {
    await interaction.deferReply({
      ephemeral: true,
    });

    const queue = useQueue(interaction.guild.id);
    const newVol = interaction.options.getNumber("amount", false);

    if (!newVol) {
      const embed = new EmbedBuilder()
        .setDescription(`Current volume is \`${queue.node.volume}%\`.`)
        .setFooter({ text: "Use '/volume <1-200>' to change the volume." });

      return interaction
        .followUp({ ephemeral: true, embeds: [embed] })
        .catch(console.error);
    }

    queue.node.setVolume(newVol);

    return interaction.followUp(`Volume is updated to ${newVol}.`);
  },
};
