const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const uFuzzy = require('@leeoniya/ufuzzy')

const sectColors = {
  'General': 0xfafafa, // make this the color for normal attack
  'Normal Attack': 0xfafafa,
  'Cloud Spirit Sword Sect': 0x2d4d8a,
  'Secret Enchantment - Cloud Spirit Sword Sect': 0x2d4d8a,
  'Five Elements Alliance': 0xb56423,
  'Secret Enchantment - Five Elements Alliance': 0xb56423,
  'Heptastar Pavillion': 0x3f2d79,
  'Secret Enchantment - Heptastar Pavillion': 0x3f2d79,
  'Duan Xuan Sect': 0x6b2121,
  'Secret Enchantment - Duan Xuan Sect': 0x6b2121,
  'Elixirist': 0x2b2b2b,
  'Formation Master': 0x2b2b2b,
  'Fortune Teller': 0x2b2b2b,
  'Fuluist': 0x2b2b2b,
  'Musician': 0x2b2b2b,
  'Painter': 0x2b2b2b,
  'Plant Master': 0x2b2b2b,
  'Spiritual Pet': 0x2b2b2b,
  'Talisman': 0x2b2b2b,
  'Exorcism Event': 0x2b2b2b,
  'Miscellaneous Cards': 0x2b2b2b,
  'Mu Yifeng': 0x2d4d8a,
  'Yan Xue': 0x2d4d8a,
  'Lin Xiaoyue': 0x2d4d8a,
  'Long Yao': 0x2d4d8a,
  'Lu Jianxin': 0x2d4d8a,
  'Li Chengyun': 0x2d4d8a,
  'Du Lingyuan': 0xb56423,
  'Hua Qinrui': 0xb56423,
  'Mu Hu': 0xb56423,
  'Wu Xingzhe': 0xb56423,
  'Nangong Shen': 0xb56423,
  'Tan Shuyan': 0x3f2d79,
  'Yan Chen': 0x3f2d79,
  'Wu Ce': 0x3f2d79,
  'Jiang Ximing': 0x3f2d79,
  'Yao Ling': 0x3f2d79,
  'Xiao Bu': 0x6b2121,
  'Tu Kui': 0x6b2121,
  'Ye Mingming': 0x6b2121,
  'Ji Fangsheng': 0x6b2121,
  'Li Man': 0x6b2121,
}
const sectIcons = {
  'General': 'https://i.imgur.com/xE7FZ8w.png',
  'Normal Attack': 'https://i.imgur.com/4vwOJRo.png',
  'Exorcism Event': 'https://i.imgur.com/xE7FZ8w.png',
  'Miscellaneous Cards': 'https://i.imgur.com/xE7FZ8w.png',
  'Cloud Spirit Sword Sect': 'https://i.imgur.com/e4hQlwX.png',
  'Heptastar Pavillion': 'https://i.imgur.com/b7pCmgi.png',
  'Five Elements Alliance': 'https://i.imgur.com/0Va1Ytk.png',
  'Duan Xuan Sect': 'https://i.imgur.com/s2jOXFc.png',
  'Secret Enchantment - Cloud Spirit Sword Sect': 'https://i.imgur.com/ex7uBrJ.png',
  'Secret Enchantment - Heptastar Pavillion': 'https://i.imgur.com/ex7uBrJ.png',
  'Secret Enchantment - Five Elements Alliance': 'https://i.imgur.com/ex7uBrJ.png',
  'Secret Enchantment - Duan Xuan Sect': 'https://i.imgur.com/ex7uBrJ.png',
  'Elixirist': 'https://i.imgur.com/mQR79bZ.png',
  'Formation Master': 'https://i.imgur.com/0Kdp0GD.png',
  'Fortune Teller': 'https://i.imgur.com/tOhBEHl.png',
  'Fuluist': 'https://i.imgur.com/qxcQD70.png',
  'Musician': 'https://i.imgur.com/prG9aOE.png',
  'Painter': 'https://i.imgur.com/xatQzNe.png',
  'Plant Master': 'https://i.imgur.com/HugEJTj.png',
  'Spiritual Pet': 'https://i.imgur.com/bDAsdBl.png',
  'Talisman': 'https://i.imgur.com/FSwBnsF.png',
  'Mu Yifeng': 'https://i.imgur.com/PrDSnSN.png',
  'Yan Xue': 'https://i.imgur.com/eMG8aEg.png',
  'Lin Xiaoyue': 'https://i.imgur.com/sJqMNae.png',
  'Long Yao': 'https://i.imgur.com/lgB7NwO.png',
  'Lu Jianxin': 'https://i.imgur.com/Z6Y7eXx.png',
  'Li Chengyun': 'https://i.imgur.com/WmPAt3q.png',
  'Du Lingyuan': 'https://i.imgur.com/yD8LLsU.png',
  'Hua Qinrui': 'https://i.imgur.com/d1cnZGp.png',
  'Mu Hu': 'https://i.imgur.com/wkHJmTU.png',
  'Wu Xingzhi': 'https://i.imgur.com/FRhJsJF.png',
  'Nangong Shen': 'https://i.imgur.com/Gqo6Ape.png',
  'Tan Shuyan': 'https://i.imgur.com/pCQKGFP.png',
  'Yan Chen': 'https://i.imgur.com/NP3z0Xp.png',
  'Wu Ce': 'https://i.imgur.com/kyVvZ0T.png',
  'Jiang Ximing': 'https://i.imgur.com/bDJE7P4.png',
  'Yao Ling': 'https://i.imgur.com/a6390w3.png',
  'Xiao Bu': 'https://i.imgur.com/HHifHKr.png',
  'Tu Kui': 'https://i.imgur.com/gwJl2x0.png',
  'Ye Mingming': 'https://i.imgur.com/t8bMlIj.png',
  'Ji Fangsheng': 'https://i.imgur.com/Fzj0ZTc.png',
  'Li Man': 'https://i.imgur.com/d2vfd7s.png',
}
const cards = require('../assets/cardData')
const lookup = require('../assets/cardLookup')
const cardNames = Object.keys(lookup)
const uf = uFuzzy({ intraMode: 1 })

module.exports = {
  data: new SlashCommandBuilder()
    .setName('card')
    .setDescription('View information on a provided card')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('card name')
        .setAutocomplete(true)
        .setRequired(true)
      ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused()

    //* uFuzzy testing
    let idxs = uf.filter(cardNames, focusedValue);

    if (idxs != null && idxs.length > 0) {
      let infoThresh = 25

      if (idxs.length <= infoThresh) {
        let info = uf.info(idxs, cardNames, focusedValue)
        let order = uf.sort(info, cardNames, focusedValue)

        await interaction.respond(
          order.map(i => { return lookup[cardNames[info.idx[i]]] })
        )
      } else {
        const newArr = [];

        const limit = Math.min(idxs.length, 25)

        for (let i = 0; i < limit; i++)
          newArr.push(lookup[cardNames[idxs[i]]].name)

        await interaction.respond(
          newArr.map(val => { return { name: val, value: val } })
        )
      }
    }

  },
  async execute(interaction) {
    let selected;
    let selectedName;
    
    if (interaction.options.getString('name') === 'random') {
      const randIndex = Math.floor(Math.random() * (cardNames.length - 1 + 1))
      
      selectedName = cardNames[randIndex]
      selected = cards[selectedName]
    } else {
      selectedName = interaction.options.getString('name')
      selected = cards[selectedName]
    }
    // const level = parseInt(interaction.options.getNumber('level')) //! potential future card level integration
    const level = 0
    const keys = Object.keys(selected)

    const fields = await keys.map((field) => ({ name: field, value: Array.isArray(selected[field]) ? `${selected[field][level]}` : `${selected[field]}` }))
    fields.shift()
    const iconFromCard = fields.shift()
    const icon = iconFromCard !== 'https://i.imgur.com/AfFp7pu.png' ? iconFromCard : sectIcons[selected.sect]
    console.warn(icon)

    const cardEmbed = new EmbedBuilder()
      .setColor(sectColors[selected.sect])
      .setTitle(selectedName)
      .setThumbnail(icon)
      .addFields(
        ...fields
      )
      // .setImage(selected.image) //! future card image integration
      // .setFooter({ text: selected.sect })
      .setFooter({ text: selected.sect, iconURL: sectIcons[selected.sect] })

    await interaction.reply({ embeds: [cardEmbed] })
  },
}
