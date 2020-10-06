const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    category: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    author_id: {
        type: Schema.Types.ObjectID,
        //required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);