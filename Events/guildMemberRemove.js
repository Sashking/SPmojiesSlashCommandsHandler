const client = require('../index');
const roleSaveSchema = require('../models/roleSaves');

client.on('guildMemberRemove', async (member) => {
    if (member.user.bot) return;
    
    const roles = []
    await member.roles.cache.forEach(r => {
        if (r != member.guild.id) 
            roles.push(r);
    });

    new roleSaveSchema({
        GuildID: member.guild.id,
        UserID: member.user.id,
        Roles: roles
    }).save()
})