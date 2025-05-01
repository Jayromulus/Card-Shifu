const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { log, warn } = require('node:console')
const sectColors = {
  'Cloud Spirit Sword Sect': 0x2d4d8a,
  'Heptastar Pavillion': 0x3f2d79,
  'Five Elements Alliance': 0xb56423,
  'Duan Xuan Sect': 0x6b2121,
  'Elixirist': 0x2b2b2b,
  'Formation Master': 0x2b2b2b,
  'Fortune Teller': 0x2b2b2b,
  'Fuluist': 0x2b2b2b,
  'Musician': 0x2b2b2b,
  'Painter': 0x2b2b2b,
  'Plant Master': 0x2b2b2b,
  'Spiritual Pet': 0x2b2b2b,
  'Talisman': 0x2b2b2b,
}
const sectIcons = {
  'Cloud Spirit Sword Sect': 'https://i.imgur.com/e4hQlwX.png',
  'Heptastar Pavillion': 'https://i.imgur.com/b7pCmgi.png',
  'Five Elements Alliance': 'https://i.imgur.com/0Va1Ytk.png',
  'Duan Xuan Sect': 'https://i.imgur.com/s2jOXFc.png',
  'Elixirist': 'https://i.imgur.com/mQR79bZ.png',
  'Formation Master': 'https://i.imgur.com/0Kdp0GD.png',
  'Fortune Teller': 'https://i.imgur.com/tOhBEHl.png',
  'Fuluist': 'https://i.imgur.com/qxcQD70.png',
  'Musician': 'https://i.imgur.com/prG9aOE.png',
  'Painter': 'https://i.imgur.com/xatQzNe.png',
  'Plant Master': 'https://i.imgur.com/HugEJTj.png',
  'Spiritual Pet': 'https://i.imgur.com/bDAsdBl.png',
  'Talisman': 'https://i.imgur.com/FSwBnsF.png',
}
const cards = require('../assets/cardData')
const cardNames = Object.keys(cards)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('card')
    .setDescription('View information on a provided card')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('card name')
        .setRequired(true)
        .setAutocomplete(true)
      ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused()
    const filtered = cardNames.filter(choice => choice.toLowerCase().replace(/\s+/, '').includes(focusedValue.toLowerCase().replace(/\s+/, '')))
    // fails AFTER the space when additional characters are added
    if (filtered.length > 25) filtered.splice(24, filtered.length)
    await interaction.respond(
      filtered.map(choice => { return { name: choice, value: choice } })
    )
  },
  async execute(interaction) {
    const selected = cards[interaction.options.getString('name')]
    // const level = parseInt(interaction.options.getNumber('level'))
    const level = 0
    const keys = Object.keys(selected)

    const fields = await keys.map((field) => ({ name: field, value: Array.isArray(selected[field]) ? `${selected[field][level]}` : `${selected[field]}` }))
    fields.shift()
    fields.shift()

    const cardEmbed = new EmbedBuilder()
      .setColor(sectColors[selected.sect])
      .setTitle(interaction.options.getString('name'))
      .setThumbnail(sectIcons[selected.sect])
      .addFields(
        ...fields
      )
      // .setImage(selected.image)
      .setFooter({ text: selected.sect })

    await interaction.reply({ embeds: [cardEmbed] })
  },
}
