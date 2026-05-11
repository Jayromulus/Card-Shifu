const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yanxue')
    .setDescription('please delay'),
  async execute(interaction) {
    await interaction.reply(`I haven't gotten to 6k with Yan Xue. Can we delay the update until next week?`)
  }
}