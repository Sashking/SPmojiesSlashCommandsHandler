const { CommandInteraction, Client, MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js');
const request = require('request').defaults({ encoding: null });
const sharp = require('sharp');

module.exports = {
    name: 'post',
    description: "Администраторская команда.",
    userPermissions: ['MANAGE_WEBHOOKS'],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const color = client.color(interaction.guild);

        let currentPageIndex = 0;

        const nameEmbed = new MessageEmbed()
            .setDescription('Укажите название эмоции')
            .setColor(color)

        const descriptionEmbed = new MessageEmbed()
            .setDescription('Укажите описание эмоции')
            .setColor(color)
        
        const linkEmbed = new MessageEmbed()
            .setDescription('Укажите ссылку на скачивание эмоции')
            .setColor(color)

        const authorEmbed = new MessageEmbed()
            .setDescription('Укажите автора анимации')
            .setColor(color)

        const ideaEmbed = new MessageEmbed()
            .setDescription('Можете указать автора идеи')
            .setColor(color)
        
        const colorEmbed = new MessageEmbed()
            .setDescription('Выберите категорию эмоции\n\n\`1\` - Боевая поза\n\`2\` - Стоячие, сидячие, лежачие позы\n\`3\` - Музыкальные позы\n\`4\` - Разное\n\`5\` - Спорт')
            .setColor(color)

        const imageEmbed = new MessageEmbed()
            .setDescription('Укажите ссылку на картинку')
            .setColor(color)

        const rpEmbed = new MessageEmbed()
            .setDescription('Можете указать название ресурс-пака')
            .setColor(color)

        const pages = [ nameEmbed, descriptionEmbed, linkEmbed, authorEmbed, ideaEmbed, colorEmbed, imageEmbed, rpEmbed ];
        const variables = [ "", "", "", "", "", "", "", "" ];

        const currentPageEmbed = (i) => {
            return pages[i];
        }

        const currentPageVariable = (i, variable) => {
            if (i === 5) {
                switch(variable) {
                    case "1":
                        variables[i] = "c73737";
                        break;
                    case "2":
                        variables[i] = "49a14b";
                        break;
                    case "3":
                        variables[i] = "b63272";
                        break;
                    case "4":
                        variables[i] = "98b834";
                        break;
                    case "5":
                        variables[i] = "404ea1";
                        break;
                    default:
                        variables[i] = "98b834";
                        break;
                }
            } else if (i === 2 || i === 6) {
                if (!String(variable).startsWith("http")) return;
                else variables[i] = variable;
            } else if (i === 7) {
                if (variable === "КСЭПСП") variables[i] = "[" + variable + "](https://youtu.be/KzOrAt9-Sus)";
                else variables[i] = variable;
            } else {
                variables[i] = variable;
            }
        }

        const categoryOverlay = (categoryColor, imageURL) => {
            let overlayImagePath;
            switch (categoryColor) {
                case "c73737":
                    overlayImagePath = 'Files/Fight.png';
                    break;
                case "49a14b":
                    overlayImagePath = 'Files/Still.png';
                    break;
                case "b63272":
                    overlayImagePath = 'Files/Music.png';
                    break;
                case "98b834":
                    overlayImagePath = 'Files/Other.png';
                    break;
                case "404ea1":
                    overlayImagePath = 'Files/Sport.png';
                    break;

                default:
                    variables[6] = imageURL;
                    return;
            }

            request.get(imageURL, async function (err, res, body) {
                sharp(body)
                    .resize(1000, 1000)
                    .png()
                    .composite([{ input: overlayImagePath }])
                    .toBuffer()
                    .then(data => {
                        const file = new MessageAttachment()
                            .setFile(data);

                        interaction.channel.send({ files: [ file ] })
                            .then((m) => {
                                variables[6] = m.attachments.first().url;
                            });
                    });
            });
        }

        let previewEmbed = new MessageEmbed()
            .setAuthor(`Автор: spmojies - ${variables[3]}`, 'https://media.discordapp.net/attachments/829634848485539851/867635140322787348/9.png')
            .setTitle(`**${variables[0]}**`)
            .setDescription(`
*${variables[1]}*

${variables[4] ? `Автор идеи: **${variables[4]}** :heart:\n` : ""}${variables[7] ? `*Ресурс пак:* ***${variables[7]}***` : ""}`)
            .setColor(variables[5] || "FFFFFF")
            .setImage(variables[6])

        // BUTTONS
        const backButton = new MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('back')
            .setEmoji('⬅')
        
        const forwardButton = new MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('forward')
            .setEmoji('➡')
        
        const deleteButton = new MessageButton()
            .setStyle('DANGER')
            .setCustomId('delete')
            .setEmoji('🗑')

        const sendButton = new MessageButton()
            .setStyle('SUCCESS')
            .setCustomId('send')
            .setEmoji('📩')

        const row = new MessageActionRow()
            .addComponents(backButton, forwardButton, deleteButton, sendButton)

        let preview = await interaction.editReply({ embeds: [ previewEmbed ] });
        interaction.channel.send({ embeds: [ currentPageEmbed(currentPageIndex) ], components: [ row ] })
            .then((msg) => {

                const buttonFilter = i =>   i.customId === 'back' && i.user.id === interaction.user.id || 
                                            i.customId === 'forward' && i.user.id === interaction.user.id || 
                                            i.customId === 'delete' && i.user.id === interaction.user.id || 
                                            i.customId === 'send' && i.user.id === interaction.user.id;

                const buttonCollector = interaction.channel.createMessageComponentCollector({ filter: buttonFilter });
                
                buttonCollector.on('collect', async (i) => {
                    if (i.customId === 'back') {
                        if (currentPageIndex > 0) {
                            currentPageIndex--;
                            i.update({ embeds: [ currentPageEmbed(currentPageIndex) ], components: [ row ] });
                        }
                    } else if (i.customId === 'forward') {
                        if (currentPageIndex + 1 < pages.length) {
                            currentPageIndex++;
                            i.update({ embeds: [ currentPageEmbed(currentPageIndex) ], components: [ row ] });
                        }
                    } else if (i.customId === 'delete') {
                        buttonCollector.stop();
                        messageCollector.stop();
                        preview.delete();
                        msg.delete();

                    } else if (i.customId === 'send') {
                        if (!variables[0] || !variables[1] || !variables[2] || !variables[3] || !variables[5] || !variables[6]) return reaction.users.remove(user.id);

                        buttonCollector.stop();
                        messageCollector.stop();
                        preview.delete();
                        msg.delete();

                        await categoryOverlay(variables[5], variables[6]);

                        setTimeout(function() {
                            const postEmbed = new MessageEmbed()
                                .setAuthor(`Автор: spmojies - ${variables[3]}`, 'https://media.discordapp.net/attachments/829634848485539851/867635140322787348/9.png')
                                .setTitle(`**${variables[0]}**`)
                                .setDescription(`
*${variables[1]}*

${variables[4] ? `Автор идеи: **${variables[4]}** :heart:\n` : ""}${variables[7] ? `*Ресурс пак:* ***${variables[7]}***` : ""}`)
                                .setColor(variables[5])
                                .setImage(variables[6])

                            const downloadButton = new MessageButton()
                                .setEmoji('📩')
                                .setLabel('Скачать эмоцию')
                                .setStyle('LINK')
                                .setURL(variables[2])

                            const row = new MessageActionRow()
                                .addComponents(downloadButton)


                            interaction.guild.channels.cache.get("840497390879506452").send({ content: '<@&842438141646340146>', embeds: [ postEmbed ], components: [ row ] })
                                .then(m => {
                                    m.react("845204691775914054");
                                });
                        }, 7000)
                    }
                })

                const messageFilter = m => m.author.id === interaction.user.id;
                const messageCollector = msg.channel.createMessageCollector({ filter: messageFilter });

                messageCollector.on('collect', m => {
                    currentPageVariable(currentPageIndex, m.content);

                    const newEmbed = new MessageEmbed()
                        .setAuthor(`Автор: spmojies - ${variables[3]}`, 'https://media.discordapp.net/attachments/829634848485539851/867635140322787348/9.png')
                        .setTitle(`**${variables[0]}**`)
                        .setDescription(`
*${variables[1]}*

${variables[4] ? `Автор идеи: **${variables[4]}** :heart:\n` : ""}${variables[7] ? `*Ресурс пак:* ***${variables[7]}***` : ""}`)
                        .setColor(variables[5] || "FFFFFF")
                        .setImage(variables[6])

                    interaction.editReply({ embeds: [ newEmbed ] });
                    m.delete();
                });
            })

    }
}