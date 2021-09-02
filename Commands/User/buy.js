const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'buy',
    description: "Список товаров SPmojies.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const animation = new MessageButton()
            .setLabel('Заказать Анимацию')
            .setEmoji('🏃‍♂️')
            .setStyle('LINK')
            .setURL('https://vk.com/market-204923972?w=product-204923972_4401327%2Fquery')

        const art = new MessageButton()
            .setLabel('Заказать Арт')
            .setEmoji('🎨')
            .setStyle('LINK')
            .setURL('https://vk.com/market-204923972?w=product-204923972_4629926%2Fquery')
        
        const row = new MessageActionRow()
            .addComponents(animation, art)

        const embed = new MessageEmbed()
            .setTitle('Наши товары:')
            .setDescription(`${interaction.user}, что вас интересует? :blush:`)
            .setColor(client.color(interaction.guild))
            .setImage('https://cdn.discordapp.com/attachments/872189861954723921/879083358121001010/Frame_2.png')

        interaction.followUp({ embeds: [ embed ], components: [ row ] });

    }
}