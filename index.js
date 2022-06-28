const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        Object.keys(Intents.FLAGS)
    ]
});

client.on('ready', () => {
    console.log('Bot is ready!\n');
});

client.on('guildMemberAdd', async(member) => {
    const channel = await member.guild.channels.cache.get(config.welcomeChannelID);
    if(!channel) return console.log('[ERROR] Please insert valid welcome channel id into config file!\n');

    const welcomeEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Welcome!')
        .setDescription(`Welcome ${member}!\nPlease do not forget to read our rules!`);
    
    try {
        channel.send({ embeds: [welcomeEmbed]});
        console.log(`[SUCCESS] Welcome message has been sent.\n[DATA] Member: ${member.user.tag} | ID: ${member.user.id}\n`);
    } catch (e) {
        return console.log(e);
    }
});

client.on('guildMemberRemove', async(member) => {
    const channel = member.guild.channels.cache.get(config.leaveChannelID);
    if(!channel) return console.log('[ERROR] Please insert valid leave channel id into config file!\n');

    const leaveEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Leave...')
        .setDescription(`${member.user.tag} just left our server :(\nGoodbye!`);
    try {
        channel.send({ embeds: [leaveEmbed]});
        console.log(`[SUCCESS] Leave message has been sent.\n[DATA] Member: ${member.user.tag} | ID: ${member.user.id}\n`);
    } catch (e) {
        return console.log(e);
    }
})

client.login(config.discordBotToken);