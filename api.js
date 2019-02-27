var express = require('express');
var status = require('http-status');

module.exports = function(wagner){
    var api = express.Router();

    api.get('/haircuts', wagner.invoke(function(Haircut){
        return function(req, res){
            Haircut.find({}, function(error, haircuts){
                if(error){
                    return res.status(status.INTERNAL_SERVER_ERROR).
                    json({error: error.toString()});
                }
                if(!Haircut){
                    return res.
                        status(status.NOT_FOUND).
                        json({error: 'Not found'});
                }
                res.json({haircuts:haircuts});
            });
        };
    }));

    api.post('/newhaircut', wagner.invoke(function(Haircut){
        return function(req, res){
            var newhaircut = new Haircut ({
                stylename : req.body.stylename,
                personCut : {
                    firstname : req.body.firstname, lastname: req.body.lastname
                },
                price: req.body.price,
                date: req.body.date,
                discount: req.body.discount
            });

            newhaircut.save(function(err, haircut){
                if (err)
                    return console.error(err);
                res.json({haircut:haircut});
            });
        };
    }));

    return api;
}