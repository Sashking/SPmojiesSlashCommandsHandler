const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    description: "Список пользовательских команд.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let commands = [];
        await readdirSync(`Commands/User/`).forEach((cmd) => {
            commands.push({
                    name: `**\` ${require(`./${cmd}`).name} \`**`,
                    value: `*${require(`./${cmd}`).description}*`,
                    inline: false,
                });
        });

        const mainMenuEmbed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .addFields(commands)
            .setColor(client.color(interaction.guild))


        interaction.followUp({ embeds: [ mainMenuEmbed ] });

    }
} 