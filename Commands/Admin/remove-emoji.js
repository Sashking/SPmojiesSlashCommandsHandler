const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const emojiSchema = require('../../models/react-channels');

module.exports = {
    name: 'remove-emoji',
    description: "Администраторская команда.",
    options: [
        {
            name: 'канал',
            description: 'Укажите канал',
            type: 'CHANNEL',
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

        let [ channelId ] = args;

        let targetChannel = interaction.guild.channels.cache.get(channelId);

        emojiSchema.findOne({ ChannelID: channelId }, (err, data) => {
            if (data) {
                emojiSchema.findOneAndDelete({ ChannelID: channelId })
                    .then(() => {
                        const successEmbed = new MessageEmbed()
                            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Эмодзи убраны из канала ${targetChannel}`)
                            .setColor('GREEN')

                        return interaction.followUp({ embeds: [ successEmbed ] });
                    });
            } else {
                const errorEmbed = new MessageEmbed()
                    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`В канале ${targetChannel} нету эмодзи`)
                    .setColor('RED')

                return interaction.followUp({ embeds: [ errorEmbed ] });
            }
        });

    }
}