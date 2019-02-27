var mongoose = require('mongoose');

module.exports = function(wagner){
    mongoose.connect('mongodb://localhost:27017/barber', {useNewUrlParser: true});

    var Haircut = mongoose.model('Haircut', require('./haircut'), 'haiircuts');

    wagner.factory('Haircut', function(){
        return Haircut;
    });

    return {
        Haircut: Haircut
    };
}