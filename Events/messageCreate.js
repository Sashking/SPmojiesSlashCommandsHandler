const { MessageEmbed, Message } = require('discord.js');
const client = require('../index');
const Schema = require('../models/react-channels');

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
    }
})