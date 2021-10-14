const client = require('../index');
const suggestionPointsSchema = require('../models/suggestionsPoints');
const logsSchema = require('../models/messageLogs');

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id !== "840501033494249472") return;
    if (reaction.emoji.name !== "👍") return;
    if (user.id === "862636099423698944") return;

    logsSchema.findOne({ MessageID: reaction.message.id }, (err, data) => {
        if (data) {
            const authorID = data.UserID;

            if (authorID == user.id) return;

            suggestionPointsSchema.findOne({ UserID: authorID }, (err, data) => {
                if (data) {
                    data.Count++;
                } else {
                    data = new suggestionPointsSchema({
                        UserID: authorID,
                        Count: 1,
                    });
                }
        
                if (data.Count == 5) {
                    data.Count = 0;

                    client.add(authorID, 2);
                }
                data.save();
            })
        }
    })

    
});
