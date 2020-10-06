const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://admin:147258369@cluster0.zykf5.mongodb.net/cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  })
    mongoose.connection.on('open', () => {
        console.log('Connected successfully');
    });
    mongoose.connection.on('error', (err) => {
        console.log(`Connected unsuccessfull ${err}`);
    });

    mongoose.Promise = global.Promise;
}