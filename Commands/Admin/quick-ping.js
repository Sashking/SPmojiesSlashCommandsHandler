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
        {
            name: 'пинг',
            description: 'Выберите какой пинг вы хотите использовать',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: '@everyone',
                    value: 'everyone'
                },
                {
                    name: 'Оповещения',
                    value: 'notifications'
                },
            ]
        },
    ],
    userPermissions: ['ADMINISTRATOR'],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const [ channelId, pingType ] = args;

        const targetChannel = interaction.guild.channels.cache.get(channelId);
        let ping = "<@&842438141646340146>";
        if (pingType == "everyone") ping = "@everyone";

        targetChannel.send({ content: ping })
            .then(m => {
                m.delete();
            });

    }
}