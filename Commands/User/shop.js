const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'shop',
    description: "Список товаров SPmojies.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const pointsShop = new MessageButton()
            .setLabel('Покупка за баллы')
            .setEmoji('🎁')
            .setStyle('PRIMARY')
            .setCustomId('points')

        const linkShop = new MessageButton()
            .setLabel('Покупка за деньги')
            .setEmoji('💳')
            .setStyle('SUCCESS')
            .setCustomId('money')
        
        const row = new MessageActionRow()
            .addComponents(linkShop, pointsShop)

        const embed = new MessageEmbed()
            .setTitle('Наши товары:')
            .setDescription(`${interaction.user}, что вас интересует? :blush:`)
            .setColor(client.color(interaction.guild))

        interaction.followUp({ embeds: [ embed ], components: [ row ] });

    }
}