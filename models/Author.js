const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
        maxlength: [40, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
    },
    surname: {
        type: String,
        required: true,
        minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
        maxlength: [40, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
    },
    bio: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('author', AuthorSchema);