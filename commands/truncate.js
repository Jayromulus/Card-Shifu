const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('truncate')
    .setDescription('if I had to choose'),
  async execute(interaction) {
    await interaction.reply(`If I had to choose between breathing and loving Crash Fist - Truncate, I would use my last breath to say "I love Crash Fist - Truncate"`)
  }
}