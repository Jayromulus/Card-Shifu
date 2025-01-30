const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { log, warn } = require('node:console')
const sectColors = {
  'Cloud Sword Sect': 0x2d4d8a,
  'Heptastar Pavillion': 0x3f2d79,
  'Five Elements Alliance': 0xb56423,
  'Duan Xuan Sect': 0x6b2121
}
const cards = require('../assets/cardData')
const cardNames = Object.keys(cards)
const initialValues = cardNames.filter((card, index) => { if(index <= 25) return { name: card, value: card } })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('card')
    .setDescription('View information on a provided card')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('card name')
        .setRequired(true)
        .setChoices(initialValues)
      ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused()
    const filtered = cardNames.filter(choice => choice.toLowerCase().replace(/\s+/, '').startsWith(focusedValue.toLowerCase().replace(/\s+/, '')))
    await interaction.respond(
      await filtered.filter((choice, index) => { if(index <= 25) return { name: choice, value: choice }})
    )
  },
  async execute(interaction) {
    const selected = cards[interaction.options.getString('name')]
    // const level = parseInt(interaction.options.getNumber('level'))
    const level = 0
    const keys = Object.keys(selected)

    const fields = await keys.map((field) => ({ name: field, value: Array.isArray(selected[field]) ? `${selected[field][level]}` : `${selected[field]}` }))
    fields.shift()

    log(...fields)

    log({ author: interaction.message.author })

    const cardEmbed = new EmbedBuilder()
      .setColor(sectColors[selected.sect])
      .setTitle(interaction.options.getString('name'))
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        ...fields
      )
      .setImage(selected.image)
      .setFooter({
        text: selected.sect,
        // iconURL: 'https://i.imgur.com/AfFp7pu.png',
      })

    await interaction.reply({ embeds: [cardEmbed] })
  },
}
