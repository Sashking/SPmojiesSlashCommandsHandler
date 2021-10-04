const mongoose = require('mongoose');

module.exports = mongoose.model('messageLogs', mongoose.Schema({
    UserID: String,
    MessageID: String,
}));
