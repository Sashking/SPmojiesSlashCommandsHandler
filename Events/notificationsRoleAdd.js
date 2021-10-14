const { MessageEmbed } = require('discord.js');
const client = require('../index');

client.on('messageReactionAdd', async (reaction, user) => {
    //                                канал оповещения
    if (reaction.message.channel.id !== "842438474703044629") return;
    if (reaction.emoji.name !== "🔔") return;
    if (user.id === "862636099423698944") return;

    //                                                     роль оповещения
    const role = reaction.message.guild.roles.cache.get("842438141646340146")
    reaction.message.guild.members.cache.get(user.id).roles.add(role);
    client.add(user.id, 20);
});
