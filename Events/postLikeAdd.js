const client = require('../index');

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id !== "840497390879506452") return;
    if (user.id === "862636099423698944") return;

    // client.add(user.id, 2);
});
