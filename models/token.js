const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userID: { type: String },
    token: { type: String }
});

module.exports = mongoose.model('Token', TokenSchema);
