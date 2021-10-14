const { CommandInteraction, Client, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'pack',
    description: "Архив всех эмоций SPmojies.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const zipFileAttachment = new MessageAttachment()
            .setFile('Files/spmojies.zip')
            .setName(`spmojies_emotes_pack.zip`)
        
        interaction.followUp({ content: '**Вот актуальная подборка всех анимаций!**', files: [ zipFileAttachment ] });

    }
}