const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const sectColors = {
  'Cloud Sword Sect': 0x2d4d8a,
  'Heptastar Pavillion': 0x3f2d79,
  'Five Elements Alliance': 0xb56423,
  'Duan Xuan Sect': 0x6b2121
}
const cards = require('../assets/cardData')
const cardNames = Object.keys(cards)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('card')
    .setDescription('View information on a provided card')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('card name')
        .setRequired(true)
        .setChoices(cardNames.map(card => ({ name: card, value: card })))
    //   )
    // .addNumberOption(option =>
    //   option
    //     .setName('level')
    //     .setDescription('card level')
    //     .setChoices([
    //       { name: '1', value: 1 },
    //       { name: '2', value: 2 },
    //       { name: '3', value: 3 }
    //     ])
      ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused()
    const filtered = cardNames.filter(choice => choice.toLowerCase().replace(/\s+/, '').startsWith(focusedValue.toLowerCase().replace(/\s+/, '')))
    await interaction.respond(
      await filtered.map(choice => ({ name: choice, value: choice }))
    )
  },
  async execute(interaction) {
    const selected = cards[interaction.options.getString('name')]
    // const level = parseInt(interaction.options.getNumber('level'))
    const level = 0
    const keys = Object.keys(selected)

    const fields = await keys.map((field) => ({ name: field, value: Array.isArray(selected[field]) ? `${selected[field][level]}` : `${selected[field]}` }))
    fields.shift()

    console.log(...fields)

    const cardEmbed = new EmbedBuilder()
      .setColor(sectColors[selected.sect])
      .setTitle(interaction.options.getString('name'))
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        ...fields
      )
      .setImage(selected.image)
      // .setTimestamp()
      .setFooter({
        text: selected.sect,
        // iconURL: 'https://i.imgur.com/AfFp7pu.png',
      })

    await interaction.reply({ embeds: [cardEmbed] })
  },
}
