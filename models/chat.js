const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    userID: { type: String },
    data: { type: String },
    time: { type: String },
    orientation: { type: String }
});

module.exports = mongoose.model('Chat', ChatSchema);
