const client = require('../index');
const messagePointsSchema = require('../models/messagePoints');
const messageLogsSchema = require('../models/messageLogs');

client.on('messageDelete', (message) => {
    messageLogsSchema.findOne({ MessageID: message.id }, (err, messageLogData) => {
        if (messageLogData) {
            messagePointsSchema.findOne({ UserID: messageLogData.UserID }, (err, countData) => {
                if (countData) {
                    countData.Count--;
                    countData.save();
                } else {
                    new messagePointsSchema({
                        UserID: messageLogData.UserID,
                        Count: 0
                    }).save()
                }
            })
        }
    })
})