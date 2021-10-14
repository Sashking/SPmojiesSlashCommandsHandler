const { CommandInteraction, Client, MessageEmbed, Collection } = require('discord.js');
const pointsSchema = require('../../models/points');

module.exports = {
    name: 'leaderboard',
    description: "Топ 10 участников по количеству баллов.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {

		const lb = [];

		pointsSchema.find({}, (err, data) => {
			data.forEach((u) => {
				const id = u.UserID;
				const bal = u.Points;
				lb.push({ id, bal });
			});
		}).then(() => {
			lb.sort((a, b) => { return a.bal - b.bal });
			lb.reverse();
			const top = lb.slice(0, 10);

			const embed = new MessageEmbed()
				.setTitle(`Топ 10 по баллам:`)
				.setDescription(top.map((v, i) => { return `**${i + 1}.** ‌‌  ${ interaction.guild.members.cache.get(v.id).user.tag } ‌‌  - ‌‌  **\`${v.bal}\`**`; }).join("\n"))
				.setColor(client.color(interaction.guild))

			interaction.followUp({ embeds: [ embed ] });
		})

    }
}