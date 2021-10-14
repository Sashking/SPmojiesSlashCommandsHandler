const { MessageEmbed } = require('discord.js');
const client = require('../index');
const logsSchema = require('../models/messageLogs');

client.on('messageReactionAdd', async (reaction, user) => {
    //                           канал проверка фотокарточек
    if (reaction.message.channel.id !== "872189821123182622") return;
    if (reaction.emoji.id !== "845202585299976212" && reaction.emoji.id !== "845202603754782770") return;
    if (user.id === "862636099423698944") return;

    if (reaction.emoji.id === "845202585299976212") {
        const originalAuthor = await (await reaction.message.guild.members.fetch()).find(m => m.user.tag === reaction.message.embeds[0].author.name);
        const embed = new MessageEmbed()
            .setAuthor(reaction.message.embeds[0].author.name, reaction.message.embeds[0].author.iconURL)
            .setImage(reaction.message.embeds[0].image.url)
            .setColor(reaction.message.embeds[0].hexColor)
        
        if (reaction.message.embeds[0].footer) embed.setFooter(reaction.message.embeds[0].footer.text);

        //                                         канал фотокарточек
        reaction.message.guild.channels.cache.get("889194282500620298").send({ embeds: [ embed ] })
            .then(async (msg) => {
                msg.react("871788034641756160");

                const data = new logsSchema({
                    UserID: originalAuthor.id,
                    MessageID: msg.id,
                }).save();

                await client.add(originalAuthor.id, 4);
            });

        const acceptEmbed = new MessageEmbed()
            .setDescription('Вашу фотокарточку одобрили!')
            .setColor('GREEN')

        originalAuthor.send({ embeds: [ acceptEmbed ] });

        reaction.message.delete();
    } else {
        const originalAuthor = await (await reaction.message.guild.members.fetch()).find(m => m.user.tag === reaction.message.embeds[0].author.name);

        const declineEmbed = new MessageEmbed()
            .setDescription('Вашу фотокарточку отклонили!')
            .setColor('RED')
        originalAuthor.send({ embeds: [ declineEmbed ] });

        reaction.message.delete();
    }
});