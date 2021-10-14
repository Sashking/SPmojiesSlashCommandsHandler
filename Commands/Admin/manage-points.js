const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'manage-points',
    description: "Администраторская команда.",
    options: [
        {
            name: 'участник',
            description: 'Укажите участника',
            type: 'USER',
            required: true
        },
        {
            name: 'режим',
            description: 'Укажите режим',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'добавить',
                    value: 'add'
                },
                {
                    name: 'убавить',
                    value: 'remove'
                },
                {
                    name: 'установить-значение',
                    value: 'set'
                },
            ]
        },
        {
            name: 'количество',
            description: 'Укажите количество баллов',
            type: 'INTEGER',
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

        const [ userID, mode, amount ] = args;

        const targetUser = client.users.cache.get(userID);

        if (mode === 'add') {
            await client.add(userID, amount);
            return interaction.followUp({ content: `Участнику ${ targetUser } успешно начислено **${ amount }** баллов.` });
        } else if (mode === 'remove') {
            await client.remove(userID, amount);
            return interaction.followUp({ content: `У участника ${ targetUser } успешно убрано **${ amount }** баллов.` });
        } else {
            await client.set(userID, amount);
            return interaction.followUp({ content: `Балы участника ${ targetUser } успешно установлены на **${ amount }** баллов.` });
        }

    }
}