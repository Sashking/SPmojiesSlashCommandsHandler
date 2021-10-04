const mongoose = require('mongoose');

module.exports = mongoose.model('messagePoints', mongoose.Schema({
    UserID: String,
    Count: Number,
}));
