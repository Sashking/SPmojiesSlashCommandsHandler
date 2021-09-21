const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sc',
    description: "Администраторская команда.",
    options: [
        {
            name: 'сокращение',
            description: 'Выберите нужное сокращение',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'танцы',
                    value: 'dance'
                },
                {
                    name: 'референсы и контекст',
                    value: 'context'
                },
                {
                    name: 'пак',
                    value: 'pack'
                },
            ]
        },
    ],
    userPermissions: ['MANAGE_MESSAGES'],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const [ shortcut ] = args;

        switch(shortcut) {
            case "dance":
                interaction.followUp({ content: "⚠️ Напоминаем, что **все танцы делаются только на заказ** в нашей группе ВКонтакте." });
                return;
            case "context":
                interaction.followUp({ content: "⚠️ Если вы что-то предлагаете, опишите **максимально чётко и понятно**, что вы имеете в виду.\nВ лучшем случае **прикрепите референсы**, по которым аниматоры смогут ориентироваться." });
                return;
            case "pack":
                interaction.followUp({ content: "⚠️ Если вы хотите **скачать все анимации одновременно**, используйте команду **`/pack`**, чтобы получить сборку всех анимаций на данный момент." });
                return;
        }

    }
}