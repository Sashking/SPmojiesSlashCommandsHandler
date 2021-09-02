const mongo = require('mongoose')

const Schema = new mongo.Schema({
    ChannelID: String,
    Emojis: [],
})

module.exports = mongo.model('react-channel', Schema);