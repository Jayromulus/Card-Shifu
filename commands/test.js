const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('testing if commands work with this bot')
    .addStringOption(option => {
      option
        .setName('test')
        .setDescription('random information')
        .setRequired(true)
    }),
  async execute(interaction) {
    await interaction.reply(`test command featuring input ${interaction.options.getString('test')}`)
  }
}