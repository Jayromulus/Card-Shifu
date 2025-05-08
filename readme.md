# Card Shifu
A discord bot for displaying general information about [Yi Xian: The Cultivation Card Game](https://store.steampowered.com/app/1948800/Yi_Xian_The_Cultivation_Card_Game/)

## Usage
[Using this link](https://discord.com/oauth2/authorize?client_id=1283122235053314088), you can add this bot to your discord server. Please submit any issues to the bot using the feedback command, or send a message mentioning user jayromulus in the community discord. Alternatively, installation instructions for personal usage or setting up your own version of the bot can be [found here](#installation)

###### *Please note that this bot is being run on a Raspberry Pi currently, please forgive slow performance during early testing as the device running this program has not been test in this volume before

## Commands
All commands are Slash Commands, meaning everything is going to be called using the format `/command-name [options]`. Below is a list of commands with details of how to use them.j
|Name|Options|Type|Description|
|-|-|-|-|
|card|name|`string`|Displays the in-game information about a given Card|
|fate|name|`string`|Displays the in-game information about a given Immortal Fate|
|cide|-|-|!cide|

## Installation
In order to run this bot on your own, you will need a [Discord Developer](https://discord.com/developers/) account. After creating an application and a bot, you will need to clone this project. Run `npm install` to get the packages required, then create a new `.env` file for storing your environment variables
|Name|Value|
|-|-|
|TOKEN|This is going to be the token for your bot provided by the discord developer portal|
|GUILD|The server ID where you would like to run your commands|
|CLIENT|Application ID found when viewing your newly created Applicatio in the [Discord Developer](https://discord.com/developers/) portal|

###### This bot is a fan-made creation, unrelated to Darksun Studios, Gamera Games, or Gamirror Games. This information will be taken down at the request of the author at any time. Please support the developers by visiting the link provided at the top of the readme.