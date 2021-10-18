const { CommandInteraction, Client, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: "Топ 10 участников по количеству баллов.",

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
		const collection = new Collection();

		await Promise.all(
			interaction.guild.members.cache.map(async (member) => {
				const id = member.id;
				const bal = await client.balance(id);
				return bal !== 0
					? collection.set(id, { 
							id,
							bal
						})
					: null;
			})
		);

		const data = collection.sort((a, b) => b.bal - a.bal).first(10);

		const embed = new MessageEmbed()
			.setTitle(`Топ 10 по баллам:`)
			.setDescription(data.map((v, i) => { return `**${i + 1}.** ‌‌  ${ interaction.guild.members.cache.get(v.id).user.tag } ‌‌  - ‌‌  **\`${v.bal}\`**`; }).join("\n"))
			.setColor(client.color(interaction.guild))

		interaction.followUp({ embeds: [ embed ] });
    }
}