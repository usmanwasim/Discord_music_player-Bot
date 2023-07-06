module.exports = {
  data: {
    name: "hello",
    description: "Reply with Hi!",
  },
  run: ({ interaction }) => {
    interaction.reply("Hi!");
  },

  //   deleted: true,
};
