const client = require("../index");

client.on("ready", () => {
    client.user.setActivity('vk.com/spmojies', { type: 'WATCHING' });
    console.log(`✅ ${client.user.username}`);
});
