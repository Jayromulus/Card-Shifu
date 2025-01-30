const cards = require('./assets/cardData')
const cardNames = Object.keys(cards)
const initialValues = cardNames.map((card, index) => { if(index <= 25) return { name: card, value: card } })

console.log(initialValues)