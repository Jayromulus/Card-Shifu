require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js')
const { log, warn } = require('node:console')
const token = process.env.TOKEN
const fates = require('./assets/cardData')
const fateNames = Object.keys(fates)
const cards = require('./assets/cardData')
const cardNames = Object.keys(cards)

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, c => {
  log(`Ready! Logged in as ${c.user.tag}`)
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)

  if('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`)
  }
}

client.on(Events.InteractionCreate, async interaction => {
  const command = interaction.client.commands.get(interaction.commandName);
  if (interaction.isChatInputCommand()) {   
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    
    try {
      if (interaction.commandName === 'card'){
        if (cardNames.includes(interaction.options.getString('name')))
          await command.execute(interaction)
        else
          await interaction.reply({ content: 'Please select a card from the autofill range', flags: MessageFlags.Ephemeral })
      } else if (interaction.commandName === 'fate'){
        if (fateNames.includes(interaction.options.getString('name')))
          await command.execute(interaction)
        else
          await interaction.reply({ content: 'Please select a fate from the autofill range', flags: MessageFlags.Ephemeral })
      } else {
        await command.execute(interaction)
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  } else if (interaction.isAutocomplete()) {
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(token);