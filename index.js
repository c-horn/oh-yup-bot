const { Client, Intents } = require('discord.js');
const { discord, log } = require('./config.json');

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

let regexTriggers = [
    { regex: /.*(o+h?\s+y+u+p+).*/i,  response: "Oh Yup!" },
    { regex: /.*(roy helu).*/i,       response: "Roy Who?" }
]

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (log) console.log(message);

    regexTriggers.forEach(trigger => {
        if (trigger.regex.test(message.content)) {
            client.channels.fetch(message.channelId).then(
                channel => channel.send(trigger.response)
            )
        }
    })

});

client.login(discord.token);
