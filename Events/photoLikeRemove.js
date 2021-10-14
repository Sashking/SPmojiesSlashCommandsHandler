const client = require('../index');
const photoPointsSchema = require('../models/photoPoints');
const logsSchema = require('../models/messageLogs');

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.channel.id !== "889194282500620298") return;
    
    if (user.id === "862636099423698944") return;

    logsSchema.findOne({ MessageID: reaction.message.id }, (err, logsData) => {
        if (logsData) {
            const photoAuthorID = logsData.UserID;

            if (photoAuthorID == user.id) return;

            photoPointsSchema.findOne({ UserID: photoAuthorID }, (err, pointsData) => {
                if (pointsData) {
                    pointsData.Count--;
                    pointsData.save();
                } else {
                    pointsData = new photoPointsSchema({
                        UserID: photoAuthorID,
                        Count: 0,
                    }).save();
                }
            });
        }
    });
});
