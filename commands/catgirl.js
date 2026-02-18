const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('catgirl')
    .setDescription('how is that possible?'),
  async execute(interaction) {
    await interaction.reply(`Why is it that this Lin Xiaoyue can mindlessly dominate everyone every season with her sword intent? This is a character even an idiot could play and easily climb the ranks. She can just pick up a few sword intent cards and get six-stage attacks right after entering the Nascent Soul stage-how is that possible? One Spirit Cat Chaotic Sword, all the rest in cultivation, and then she can just sit back and collect points. What's the point of designing such a brainless character?`)
  }
}