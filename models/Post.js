var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = require('../models/User.js');

var PostSchema = new Schema(
    {
        user: { type: Schema.ObjectId, ref : 'User' },
        title: String,
        description : String,
        publicationdate: { type: Date, default: date.now() }
    });

module.exports = mongoose.model ('Post', PostSchema);
