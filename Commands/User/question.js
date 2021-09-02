const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'question',
    description: "Задайте боту любой вопрос.",
    options: [
        {
            name: 'вопрос',
            description: 'Укажите текст вопроса',
            type: 'STRING',
            required: true
        },
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const [ question ] = args;

        const replies = [
            "Да.",
            "Нет.",
            "Не.",
            "Полагаю что да.",
            "Полагаю что нет.",
            "Возможно.",
            "Вероятно.",
            "Может быть.",
            "Не знаю.",
            "Да, конечно.",
            "Без сомнений.",
            "Верно.",
            "Конечно.",
            "Конечно же нет.",
            "Ни в коем случае.",
            ":a::b::regional_indicator_o::b::a:",
        ];
      
        let reply = replies[Math.floor(Math.random() * replies.length)];
      
        interaction.followUp({ content: `> *${question}*\n**${reply}**` });

    }
}