// Imports
const { Client, Collection } = require("discord.js");
const pointsSchema = require("./models/points.js");

// Client Initialisation
const client = new Client({ partials: [ 'CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION' ], intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] });
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.color = (guild) => guild.me.displayHexColor === "000000" ? "#ffffff" : guild.me.displayHexColor;
client.add = (userID, amount) => {
    pointsSchema.findOne({ UserID: userID }, (err, data) => {
        if (data) {
            data.Points += amount;
            data.save();
        } else {
            data = new pointsSchema({
                UserID: userID,
                Points: amount,
            });
            data.save();
        }
    });
}
client.remove = (userID, amount) => {
    pointsSchema.findOne({ UserID: userID }, (err, data) => {
        if (data) {
            data.Points -= amount;
            data.save();
        } else {
            data = new pointsSchema({
                UserID: userID,
                Points: 0,
            });
            data.save();
        }
        
        if (data.Points < 0) {
            data.Points = 0;
            data.save();
        }
    });
}
client.set = (userID, amount) => {
    pointsSchema.findOne({ UserID: userID }, (err, data) => {
        if (data) {
            data.Points = amount;
            data.save();
        } else {
            data = new pointsSchema({
                UserID: userID,
                Points: amount,
            });
            data.save();
        }
        
        if (data.Points < 0) {
            data.Points = 0;
            data.save();
        }
    });
}
client.balance = (userID) => 
    new Promise(async (ful) => {
		const data = await pointsSchema.findOne({ UserID: userID });
		if (!data) return ful(0);
		ful(data.Points);
    })

// .env Variables
require('dotenv').config();
const token = process.env.TOKEN;
const mongo = process.env.MONGO;

// Initializing the Project
require("./util")(client);
require("./util/mongoose")(mongo);

client.login(token).then(() => {});