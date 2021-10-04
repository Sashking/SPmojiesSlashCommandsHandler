const client = require('../index');
const messagePointsSchema = require('../models/messagePoints');
const messageLogsSchema = require('../models/messageLogs');

client.on('messageDelete', (message) => {
    // messageLogsSchema.findOne({ MessageID: message.id }, (err, logData) => {
    //     if (logData) {
    //         messagePointsSchema.findOne({ UserID: logData.UserID }, (err, countData) => {
    //             if (countData) {
    //                 countData.Count--;
    //                 countData.save();
    //             } else {
    //                 new messagePointsSchema({
    //                     UserID: logData.UserID,
    //                     Count: 0
    //                 }).save()
    //             }
    //         })
    //     }
    // })
})