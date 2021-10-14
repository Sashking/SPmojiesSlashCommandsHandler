const mongoose = require('mongoose');

module.exports = mongoose.model('photoPoints', mongoose.Schema({
    UserID: String,
    Count: Number,
}));
