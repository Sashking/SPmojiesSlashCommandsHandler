const client = require('../index');
const photoPointsSchema = require('../models/photoPoints');
const logsSchema = require('../models/messageLogs');

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id !== "889194282500620298") return;

    if (user.id === "862636099423698944") return;

    logsSchema.findOne({ MessageID: reaction.message.id }, (err, data) => {
        if (data) {
            const photoAuthorID = data.UserID;

            if (photoAuthorID == user.id) return;

            photoPointsSchema.findOne({ UserID: photoAuthorID }, (err, data) => {
                if (data) {
                    data.Count++;
                } else {
                    data = new photoPointsSchema({
                        UserID: photoAuthorID,
                        Count: 1,
                    });
                }
        
                if (data.Count == 2) {
                    data.Count = 0;
        
                    client.add(photoAuthorID, 2);
                }
                data.save();
            });
        } else {
            console.log(reaction.message.id, 'photo not found')
        }
    });
});
