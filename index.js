// Massive W or massive L? 🔥💯

const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// function to create two new json files called w_count.json and l_count.json
function createJSON() {
    const data = {};
    fs.writeFileSync('./data.json', JSON.stringify(data));
}

// function to set a user's w count to n
function setWCount(user, n) {
    const data = JSON.parse(fs.readFileSync('./data.json'));

    // if user exists in data.json, set w count to n
    if (data[user]) {
        // console.log('Updating ' + user.username + ' (' + user + ') \'s w count to ' + n);
        data[user].w_count = n;
    } else {
        // if user doesn't exist in data.json, create new user and set w count to n
        console.log('Creating new user ' + user.username + ' (' + user + ')  with w count of ' + n);
        data[user] = {
            "w_count": n,
            "l_count": 0
        };
    }

    fs.writeFileSync('./data.json', JSON.stringify(data));
    console.log('Updated ' + user.username + ' (' + user + ')\'s w count to ' + n);
}

// fucntion to set a user's l count to n
function setLCount(user, n) {
    const data = JSON.parse(fs.readFileSync('./data.json'));

    // if user exists in data.json, set l count to n
    if (data[user]) {
        // console.log('Updating ' + user.username + ' (' + user + ') \'s l count to ' + n);
        data[user].l_count = n;
    } else {
        // if user doesn't exist in data.json, create new user and set l count to n
        console.log('Creating new user ' + user.username +  '(' + user + ')  with l count of ' + n);
        data[user] = {
            "w_count": 0,
            "l_count": n
        };
    }

    fs.writeFileSync('./data.json', JSON.stringify(data));
    console.log('Updated ' + user.username + ' (' + user + ')\'s l count to ' + n);
}

// function to get a user's w count
function getWCount(user) {
    // if user exists in data.json, return w count
    const data = JSON.parse(fs.readFileSync('./data.json'));
    if (data[user]) {
        return data[user].w_count;
    }
    // if user doesn't exist in data.json, return 0
    console.log('User ' + user + ' does not exist in data.json, returning 0');
    return 0;
}

// function to get a user's l count
function getLCount(user) {
    // if user exists in data.json, return l count
    const data = JSON.parse(fs.readFileSync('./data.json'));
    if (data[user]) {
        return data[user].l_count;
    }
    // if user doesn't exist in data.json, return 0
    console.log('User ' + user + ' does not exist in data.json, returning 0');
    return 0;
}

function leaderboard() {
    // order data.json by w count and l count added together
    const data = JSON.parse(fs.readFileSync('./data.json'));
    const ordered = Object.keys(data).sort((a, b) => data[b].w_count + data[b].l_count - (data[a].w_count + data[a].l_count));
    let leaderboard = '';
    for (let i = 0; i < ordered.length; i++) {
        leaderboard += (i + 1) + '. ' + ordered[i] + ' has ' + data[ordered[i]].w_count + ' W\s and ' + data[ordered[i]].l_count + ' L\s 💀💀 \n';
    }
    return leaderboard;
}

client.once('ready', () => {
    // check if the w_count.json and l_count.json files exist, if not create them
    if (!fs.existsSync('./data.json')) {
        console.log('data.json does not exist, creating it');
        createJSON();
    }

	console.log('Bot is now online.');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;
    const user = interaction.user;
    const username = interaction.user.username;
    
    let target_user = 0;
    let target_user_raw = 0;
    let target_username = 0;

    // if interaction has options
    if (interaction.options.get('user')) {
        target_user = interaction.options.get('user').value.replace('!', '');
        target_user_raw = target_user.replace('<@', '').replace('>', '');
        target_username = client.users.cache.get(target_user_raw).username;

        console.log(username+ ' (' + user + ') used ' + commandName + ' on ' + target_username + ' (' + target_user + ')');
    }

	if (commandName === 'massive_w' && interaction.options) {
        const w_count = getWCount(target_user);
        setWCount(target_user, w_count + 1);
        interaction.reply(target_username + ' just aquired a massive W! 🔥🔥💯\n' + target_username + ' now has ' + getWCount(target_user) + ' Ws! 💪');

    } else if (commandName === 'massive_l' && interaction.options) {
        const l_count = getLCount(target_user);
        setLCount(target_user, l_count + 1);
        interaction.reply(target_username + ' just took a massive L! 😭😭\n' + target_username + ' now has ' + getLCount(target_user) + ' Ls! 💀💀💀');
    
    } else if (commandName === 'w_count' && interaction.options) {
        interaction.reply(target_username + ' has ' + getWCount(target_user) + ' Ws! 🔥💯');
    
    } else if (commandName === 'l_count' && interaction.options) {
        interaction.reply(target_username + ' has ' + getLCount(target_user) + ' Ls! 💀');

    } else if (commandName === 'leaderboard') {
        interaction.reply(leaderboard());

    }
});

client.login(token);
