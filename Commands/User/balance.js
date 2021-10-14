const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const emojiSchema = require('../../models/react-channels');

module.exports = {
    name: 'balance',
    description: "Посмотрите свой (или чужой) балланс баллов.",
    options: [
        {
            name: 'участник',
            description: 'Можете указать участника',
            type: 'USER',
            required: false
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {

        let [ userID ] = args;
        if (!userID) userID = interaction.user.id;

        const targetUser = client.users.cache.get(userID);
        const balance = await client.balance(userID);

        const embed = new MessageEmbed()
            .setDescription(`У участника ${targetUser} - **${ balance }** баллов`)
            .setColor(client.color(interaction.guild))

        interaction.followUp({ embeds: [ embed ] });

    }
}