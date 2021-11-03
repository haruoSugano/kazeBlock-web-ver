const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kazeBlock', {
    useNewUrlParser: true
}, (err) => {
    if(err){
        console.log(err);
    }
    else {
        console.log('MongoDb Conectado com sucesso!');
    }
});

mongoose.Promise = global.Promise;

module.exports = mongoose;