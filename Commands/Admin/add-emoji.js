const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const emojiSchema = require('../../models/react-channels');

module.exports = {
    name: 'add-emoji',
    description: "Администраторская команда.",
    options: [
        {
            name: 'канал',
            description: 'Укажите канал',
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'эмодзи-айди',
            description: 'Укажите айди эмодзи, которое хотите добавить',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: ['ADMINISTRATOR'],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {

        let [ channelId, emoji ] = args;

        let targetChannel = interaction.guild.channels.cache.get(channelId);

        emojiSchema.findOne({ ChannelID: channelId }, (err, data) => {
            if (data) data.Emojis.push(emoji);
            else {
                data = new emojiSchema({
                    ChannelID: channelId,
                    Emojis: [ emoji ],
                })
            }

            data.save();
            const successEmbed = new MessageEmbed()
                .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Эмодзи добавлен в канал ${targetChannel}`)
                .setColor('GREEN')

            interaction.followUp({ embeds: [ successEmbed ] });
        });

    }
}