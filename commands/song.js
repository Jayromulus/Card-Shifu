const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('song')
    .setDescription('just draw the out :)'),
  async execute(interaction) {
    await interaction.reply('https://youtu.be/T_M39YRla60?si=cLk6J1wyNO_kUIQc&t=112')
  }
}