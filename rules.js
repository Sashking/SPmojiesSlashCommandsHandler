const { CommandInteraction, Client, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'rules',
    description: "Список пользовательских команд.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

    const imageAttachment = new MessageAttachment()
        .setFile('Files/rules.png')

    const emojiesEmbed = new MessageEmbed()
        .setDescription(`
**\`Предложения\`**
Идеи для эмоций должны соблюдать эти правила:

• Лишь **одна идея на одно сообщение**
• NSFW и нон-рп эмоции **запрещены**
• Используйте здравый смысл
• Никаких тупых эмоций по типу "Писать стоя"
• Анимации танцев можно **заказать лишь за деньги**

*Далее, поймите что даже если ваше предложение наберет много "лайков" - последнее слово за аниматорами.*
*Также, если вам нужна анимация но вы не хотите чтобы она была у других, можете обратиться напрямую и получить ее быстро на заказ.*

**\`Общий чат\`**
• Запрещено **оскорблять кого либо**
• Запрещен **спам** & **флуд**
• Запрещено **рекламировать что либо**, что не связано напрямую с SPmojies
• Запрещено **разводить конфликты в чате**

**\`Фотокарточки\`**
• NSFW или фото не по теме - **запрещены**


*Незнание правил не освобождает от ответственности*
*Администратор имеет полное право вносить или изменять правила если он посчитает это нужным.*
`)
        .setColor('d6a351')

        interaction.guild.channels.cache.get("840501654352035851").send({ embeds: [ emojiesEmbed ], files: [ 'https://cdn.discordapp.com/attachments/840518294548381716/899722156856967198/rules.png' ] });

    }
}