const mongoose = require('mongoose');

module.exports = mongoose.model('suggestionsPoints', mongoose.Schema({
    UserID: String,
    Count: Number,
}));
