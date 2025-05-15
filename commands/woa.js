const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('woa')
    .setDescription('Way Of Adaptation'),
  async execute(interaction) {
    await interaction.reply(`If Way Of Adaption has a million fans, then SenpaiBlank is one of them. If Way Of Adaption has ten fans, then SenpaiBlank is one of them. If Way Of Adaption has only one fan then that is SenpaiBlank. If Way Of Adaption has no fans, then that means SenpaiBlank is no longer on earth. If the world is against Way Of Adaption, then SenpaiBlank is against the world.`)
  }
}