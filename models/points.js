const mongoose = require('mongoose');

module.exports = mongoose.model('points', mongoose.Schema({
    UserID: String,
    Points: Number,
}));
