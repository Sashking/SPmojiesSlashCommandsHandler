const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const client = require('../index')

client.on('interactionCreate', async (interaction) => {

    const acceptEmojiID = "896345584879960135";
    const cancelEmojiID = "896345520681930762";

    if (interaction.isCommand()) {
        await interaction.deferReply().catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: 'Произошла ошибка!' });

        const args = [];
        interaction.options.data.map((x) => {
            args.push(x.value);
        });

        cmd.run(client, interaction, args);
    } else if (interaction.isButton()) {
        await interaction.deferReply().catch(() => {});

        if (interaction.customId == 'money') {

            const embed = new MessageEmbed()
                .setTitle('Наши товары:')
                .setColor(client.color(interaction.guild))
                .setImage('https://cdn.discordapp.com/attachments/872189861954723921/879083358121001010/Frame_2.png')
                .setFooter(interaction.user.tag, interaction.user.avatarURL({ dynamic: true }))

            const animation = new MessageButton()
                .setLabel('Заказать Анимацию')
                .setEmoji('🤸‍♀️')
                .setStyle('LINK')
                .setURL('https://vk.com/market-204923972?w=product-204923972_4401327%2Fquery')
    
            const art = new MessageButton()
                .setLabel('Заказать Арт')
                .setEmoji('🎨')
                .setStyle('LINK')
                .setURL('https://vk.com/market-204923972?w=product-204923972_4629926%2Fquery')
            
            const row = new MessageActionRow()
                .addComponents(animation, art)

            interaction.followUp({ embeds: [ embed ], components: [ row ] })

        } else if (interaction.customId == 'points') {
            
            const pointsWarn = new MessageButton()
                .setLabel('150 баллов - Убрать 1 варн')
                .setCustomId('warn')
                .setEmoji('⚠️')
                .setStyle('PRIMARY')

            const pointsColor = new MessageButton()
                .setLabel('300 баллов - Сменить цвет ника')
                .setCustomId('color')
                .setEmoji('🎨')
                .setStyle('PRIMARY')

            const pointsAnimation = new MessageButton()
                .setLabel('1000 баллов - Заказать анимацию')
                .setCustomId('animation')
                .setEmoji('🤸‍♀️')
                .setStyle('SUCCESS')

            const pointsArt = new MessageButton()
                .setLabel('3500 баллов - Заказать арт')
                .setCustomId('art')
                .setEmoji('🖍️')
                .setStyle('SUCCESS')

            const row1 = new MessageActionRow()
                .addComponents(pointsWarn)
            
            const row2 = new MessageActionRow()
                .addComponents(pointsColor)
            
            const row3 = new MessageActionRow()
                .addComponents(pointsAnimation)

            const row4 = new MessageActionRow()
                .addComponents(pointsArt)
            

            const embed = new MessageEmbed()
                .setTitle('Товары за баллы:')
                .setColor(client.color(interaction.guild))
                .setFooter(interaction.user.tag, interaction.user.avatarURL({ dynamic: true }))

            interaction.followUp({ embeds: [ embed ], components: [ row1, row2, row3, row4 ] })

        } else if (interaction.customId == 'warn') {

            const embed = new MessageEmbed()
                .setDescription('Подтвердите покупку: **Убрать 1 варн (150 баллов)**')
                .setColor(client.color(interaction.guild))
                .setAuthor(`${interaction.user.tag} - ${await client.balance(interaction.user.id)} баллов`, interaction.user.avatarURL({ dynamic: true }))
            
            const confirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('warnbuy')

            const cancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('warncancel')
            
            const disabledConfirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('warnbuydisabled')
                .setDisabled(true)

            const disabledCancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('warncanceldisabled')
                .setDisabled(true)

            const normalRow = new MessageActionRow()
                .addComponents(confirmButton, cancelButton)

            const notEnoughMoneyRow = new MessageActionRow()
                .addComponents(disabledConfirmButton, disabledCancelButton)

            const row = (await client.balance(interaction.user.id) < 150) ? notEnoughMoneyRow : normalRow;

            interaction.followUp({ embeds: [ embed ], components: [ row ] })
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 60000);
                })

            const filter = i => i.customId === 'warnbuy' && i.user.id === interaction.user.id || i.customId === 'warncancel' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.customId === 'warnbuy') {
                    i.followUp({ content: `${i.user}, покупка прошла успешно.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    interaction.guild.channels.create(i.user.username, {
                        type: 'GUILD_TEXT',
                        parent: '895290558627606548',
                        permissionOverwrites: [
                            {
                                id: interaction.guildId,
                                deny: [ 'VIEW_CHANNEL' ],
                            },
                            {
                                id: i.user.id,
                                allow: [ 'VIEW_CHANNEL', 'SEND_MESSAGES' ],
                            },
                        ],
                    }).then(async (c) => {
                        await client.remove(i.user.id, 150);
                        const channelEmbed = new MessageEmbed()
                            .setDescription(`Участник ${i.user} купил **Убрать 1 варн (150 баллов)**`)
                            .setColor(client.color(interaction.guild))

                        c.send({ content: `<@${i.user.id}>, администраторы свяжутся с вами в ближайшее время.\nПока вы ждете, можете описать детали заказа/покупки (например: цвет ника, анимация, и т.п)`, embeds: [ channelEmbed ] });
                    })
                } else {
                    i.followUp({ content: `${i.user}, покупка отменена.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    collector.stop();
                }
            });

        } else if (interaction.customId == 'color') {
            
            const embed = new MessageEmbed()
                .setDescription('Подтвердите покупку: **Смена цвета ника (300 баллов)**')
                .setColor(client.color(interaction.guild))
                .setAuthor(`${interaction.user.tag} - ${await client.balance(interaction.user.id)} баллов`, interaction.user.avatarURL({ dynamic: true }))
            
            const confirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('colorbuy')

            const cancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('colorcancel')
            
            const disabledConfirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('colorbuydisabled')
                .setDisabled(true)

            const disabledCancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('colorcanceldisabled')
                .setDisabled(true)

            const normalRow = new MessageActionRow()
                .addComponents(confirmButton, cancelButton)

            const notEnoughMoneyRow = new MessageActionRow()
                .addComponents(disabledConfirmButton, disabledCancelButton)

            const row = (await client.balance(interaction.user.id) < 300) ? notEnoughMoneyRow : normalRow;

            interaction.followUp({ embeds: [ embed ], components: [ row ] })
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 60000);
                })

            const filter = i => i.customId === 'colorbuy' && i.user.id === interaction.user.id || i.customId === 'colorcancel' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.customId === 'colorbuy') {
                    i.followUp({ content: `${i.user}, покупка прошла успешно.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    interaction.guild.channels.create(i.user.username, {
                        type: 'GUILD_TEXT',
                        parent: '895290558627606548',
                        permissionOverwrites: [
                            {
                                id: interaction.guildId,
                                deny: [ 'VIEW_CHANNEL' ],
                            },
                            {
                                id: i.user.id,
                                allow: [ 'VIEW_CHANNEL', 'SEND_MESSAGES' ],
                            },
                        ],
                    }).then(async (c) => {
                        await client.remove(i.user.id, 300);
                        const channelEmbed = new MessageEmbed()
                            .setDescription(`Участник ${i.user} купил  **Смена цвета ника (300 баллов)**`)
                            .setColor(client.color(interaction.guild))

                        c.send({ content: `<@${i.user.id}>, администраторы свяжутся с вами в ближайшее время.\nПока вы ждете, можете описать детали заказа/покупки (например: цвет ника, анимация, и т.п)`, embeds: [ channelEmbed ] });
                    })
                } else {
                    i.followUp({ content: `${i.user}, покупка отменена.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    collector.stop();
                }
            });

        } else if (interaction.customId == 'animation') {
            
            const embed = new MessageEmbed()
                .setDescription('Подтвердите покупку: **Анимация (1000 баллов)**')
                .setColor(client.color(interaction.guild))
                .setAuthor(`${interaction.user.tag} - ${await client.balance(interaction.user.id)} баллов`, interaction.user.avatarURL({ dynamic: true }))
            
            const confirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('animationbuy')

            const cancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('animationcancel')
            
            const disabledConfirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('animationbuydisabled')
                .setDisabled(true)

            const disabledCancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('animationcanceldisabled')
                .setDisabled(true)

            const normalRow = new MessageActionRow()
                .addComponents(confirmButton, cancelButton)

            const notEnoughMoneyRow = new MessageActionRow()
                .addComponents(disabledConfirmButton, disabledCancelButton)

            const row = (await client.balance(interaction.user.id) < 1000) ? notEnoughMoneyRow : normalRow;

            interaction.followUp({ embeds: [ embed ], components: [ row ] })
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 60000);
                })

            const filter = i => i.customId === 'animationbuy' && i.user.id === interaction.user.id || i.customId === 'animationcancel' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.customId === 'animationbuy') {
                    i.followUp({ content: `${i.user}, покупка прошла успешно.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    interaction.guild.channels.create(i.user.username, {
                        type: 'GUILD_TEXT',
                        parent: '895290558627606548',
                        permissionOverwrites: [
                            {
                                id: interaction.guildId,
                                deny: [ 'VIEW_CHANNEL' ],
                            },
                            {
                                id: i.user.id,
                                allow: [ 'VIEW_CHANNEL', 'SEND_MESSAGES' ],
                            },
                        ],
                    }).then(async (c) => {
                        await client.remove(i.user.id, 1000);
                        const channelEmbed = new MessageEmbed()
                            .setDescription(`Участник ${i.user} купил **Анимация (1000 баллов)**`)
                            .setColor(client.color(interaction.guild))

                        c.send({ content: `<@${i.user.id}>, администраторы свяжутся с вами в ближайшее время.\nПока вы ждете, можете описать детали заказа/покупки (например: цвет ника, анимация, и т.п)`, embeds: [ channelEmbed ] });
                    })
                } else {
                    i.followUp({ content: `${i.user}, покупка отменена.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    collector.stop();
                }
            });

        } else if (interaction.customId == 'art') {
            
            const embed = new MessageEmbed()
                .setDescription('Подтвердите покупку: **Арт (3500 баллов)**')
                .setColor(client.color(interaction.guild))
                .setAuthor(`${interaction.user.tag} - ${await client.balance(interaction.user.id)} баллов`, interaction.user.avatarURL({ dynamic: true }))
            
            const confirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('artbuy')

            const cancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('artcancel')
            
            const disabledConfirmButton = new MessageButton()
                .setEmoji(acceptEmojiID)
                .setLabel('Купить')
                .setStyle('SUCCESS')
                .setCustomId('artbuydisabled')
                .setDisabled(true)

            const disabledCancelButton = new MessageButton()
                .setEmoji(cancelEmojiID)
                .setLabel('Отмена')
                .setStyle('DANGER')
                .setCustomId('artcanceldisabled')
                .setDisabled(true)

            const normalRow = new MessageActionRow()
                .addComponents(confirmButton, cancelButton)

            const notEnoughMoneyRow = new MessageActionRow()
                .addComponents(disabledConfirmButton, disabledCancelButton)

            const row = (await client.balance(interaction.user.id) < 3500) ? notEnoughMoneyRow : normalRow;

            interaction.followUp({ embeds: [ embed ], components: [ row ] })
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 60000);
                })

            const filter = i => i.customId === 'artbuy' && i.user.id === interaction.user.id || i.customId === 'artcancel' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.customId === 'artbuy') {
                    i.followUp({ content: `${i.user}, покупка прошла успешно.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    interaction.guild.channels.create(i.user.username, {
                        type: 'GUILD_TEXT',
                        parent: '895290558627606548',
                        permissionOverwrites: [
                            {
                                id: interaction.guildId,
                                deny: [ 'VIEW_CHANNEL' ],
                            },
                            {
                                id: i.user.id,
                                allow: [ 'VIEW_CHANNEL', 'SEND_MESSAGES' ],
                            },
                        ],
                    }).then(async (c) => {
                        await client.remove(i.user.id, 3500);
                        const channelEmbed = new MessageEmbed()
                            .setDescription(`Участник ${i.user} купил **Арт (3500 баллов)**`)
                            .setColor(client.color(interaction.guild))

                        c.send({ content: `<@${i.user.id}>, администраторы свяжутся с вами в ближайшее время.\nПока вы ждете, можете описать детали заказа/покупки (например: цвет ника, анимация, и т.п)`, embeds: [ channelEmbed ] });
                    })
                } else {
                    i.followUp({ content: `${i.user}, покупка отменена.` }).then((msg) => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                        }, 15000)
                    })
                    await i.message.edit({ embeds: [ embed ], components: [ notEnoughMoneyRow ] });
                    collector.stop();
                }
            });

        }
    }
})