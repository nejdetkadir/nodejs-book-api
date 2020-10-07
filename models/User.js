const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
        maxlength: [40, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
    },
    password: {
        type: String,
        required: true,
        minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
        maxlength: [70, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
    }
});

module.exports = mongoose.model('user', UserSchema);