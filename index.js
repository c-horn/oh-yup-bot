const { Client, Intents, ActivityTypes } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ["CHANNEL", "MESSAGE"]
});

client.once('ready', () => {
    console.log("ready!!");
    client.user.setPresence({ activities: [{ name: 'Oh Yuuuuup!', type: 2 }], status: 'online' });
});

let ohYupRegex = /.*(o+h?\s+y+u+p+).*/i;

client.on('messageCreate', message => {
    if (message.author.bot) return;

    console.log(message);
    if (ohYupRegex.test(message.content)) {
        client.channels.fetch(message.channelId).then(
            channel => channel.send("Oh Yup!")
        )
    }
});

client.login(token);
