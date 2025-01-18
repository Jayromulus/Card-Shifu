require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { CLIENT, GUILD, TOKEN } = process.env
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	if(file !== 'weapons.js' && file !== 'trait.js') {
		const command = require(`./commands/${file}`);
  	commands.push(command.data.toJSON());
	}
};

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    await rest.put(Routes.applicationGuildCommands(CLIENT, GUILD), { body: [] })
      .then(() => console.log('Successfully deleted all guild commands.'))
      .catch(console.error);

    const data = await rest.put(Routes.applicationGuildCommands(CLIENT, GUILD), { body: commands });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();