module.exports = (interaction) => {
  if (interaction.author.bot) return;

  interaction.reply(
    `Hi! ${interaction.author.username} 🥷, How can i help you ?👻`
  );
};
