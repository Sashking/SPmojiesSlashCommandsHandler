const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'qp',
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

        const [ channelId ] = args;

        const targetChannel = interaction.guild.channels.cache.get(channelId);

        targetChannel.send({ content: '<@&842438141646340146>' })
            .then(m => {
                m.delete();
            });

    }
}