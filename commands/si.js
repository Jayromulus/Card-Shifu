const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('si')
    .setDescription('Sword Intent'),
  async execute(interaction) {
    await interaction.reply(`why do people like sword intent. it is the shittiest board`)
  }
}