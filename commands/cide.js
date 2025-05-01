const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cide')
    .setDescription('I love this game'),
  async execute(interaction) {
    await interaction.reply(`I love this game but thanks to a certain card that makes your opponent SKIP THEIR NEXT CARD makes me lose interest in it. Imagine spending 20 minutes creating a perfect build just to lose because of a single card. For example you've create a dharma sword build just for your opponent to make you skip your dharma sword card then you just lose.`)
  }
}