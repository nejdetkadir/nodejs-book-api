const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
   name: {
       type: String,
       required: [true, '`{PATH}` is required.'],
       minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
       maxlength: [40, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
   },
    category: {
        type: String,
        required: true,
        minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
        maxlength: [40, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
    },
    publisher: {
        type: String,
        required: true,
        minlength: [2, '`{PATH}` is very short for inserting. (min: {MINLENGTH})'],
        maxlength: [40, '`{PATH}` is very long for inserting. (max: {MAXLENGTH})']
    },
    year: {
        type: Number,
        required: true,
        max: 2020
    },
    likes: {
        type: Number,
        default: 0
    },
    author_id: {
        type: Schema.Types.ObjectID,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);