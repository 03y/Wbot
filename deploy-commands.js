const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');


const commands = [
	new SlashCommandBuilder().setName('massive_w')
        .setDescription('Aquire a massive W')
        .addStringOption(option => option.setName('user')
            .setDescription('Enter a user to aquire a massive W for')
            .setRequired(true)),
	
    new SlashCommandBuilder().setName('massive_l')
        .setDescription('Aquire a massive L')
        .addStringOption(option => option.setName('user')
            .setDescription('Enter a user to aquire a massive L for')
            .setRequired(true)),

    new SlashCommandBuilder().setName('w_count')
        .setDescription('Get a user\'s W count')
        .addStringOption(option => option.setName('user')
            .setDescription('Enter a user to get their W count')
            .setRequired(true)),

    new SlashCommandBuilder().setName('l_count')
        .setDescription('Get a user\'s L count')
        .addStringOption(option => option.setName('user')
            .setDescription('Enter a user to get their L count')
            .setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);