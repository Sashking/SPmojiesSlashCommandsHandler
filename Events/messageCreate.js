const { MessageEmbed, Message } = require('discord.js');
const client = require('../index');
const Schema = require('../models/react-channels');
const messagePointsSchema = require('../models/messagePoints');
const messageLogsSchema = require('../models/messageLogs');

client.on('messageCreate', (message) => {
    Schema.findOne({ ChannelID: message.channel.id }, (err, data) => {
        if (data) {
            data.Emojis.forEach(emoji => {
                message.react(emoji).catch(() => {});
            });
        }
    });

    if (!message.guild) {
        if (message.attachments.size > 0) {
            if (message.author.bot) return;

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setImage(message.attachments.first().url)
                .setColor('d6a451')
            
            if (message.content) embed.setFooter(message.content);
            
            client.guilds.cache.get("840492830278811649").channels.cache.get("872189821123182622").send({ embeds: [ embed ] })
                .then((msg) => {
                    msg.react("845202585299976212");
                    msg.react("845202603754782770");

                    message.reply('Ваша фотокарточка отправлена на рассмотрение!');
                });
        }
    // } else{
    //     if (message.channel.id == "873997339315044392") {
    //         new messageLogsSchema({
    //             UserID: message.author.id,
    //             MessageID: message.id,
    //         }).save();
            
    //         messagePointsSchema.findOne({ UserID: message.author.id }, (err, data) => {
    //             if (data) {
    //                 data.Count++;
    //             } else {
    //                 data = new messagePointsSchema({
    //                     UserID: message.author.id,
    //                     Count: 1,
    //                 });
    //             }

    //             if (data.Count == 20) {
    //                 data.Count = 0;

    //                 client.add(message.author.id, 10);
    //             }
    //             data.save();
    //         });
    //     }
    }
})