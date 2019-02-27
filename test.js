var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');
var bodyParser = require('body-parser');

var URL_ROOT = 'http://localhost:3000';

describe('Haircut APi', function(){
    var server;
    var Haircut;

    before(function(){
        var app = express();
        

        //Bootstrap server
        app.use(bodyParser.json());
        models = require('./models')(wagner);
        app.use(require('./api')(wagner));

        server = app.listen(3000);

        Haircuts = models.Haircut;
    });

    after(function(){
        server.close();
    });

    beforeEach(function(done){
        Haircuts.remove({}, function(err){
            assert.ifError(err);
            done();
        });
    });

    it('returns no haircuts', function(done){
        superagent.get(URL_ROOT+'/haircuts', function(error, res){
            assert.ifError(error);
            assert.equal(res.body.haircuts.length, 0);
            done();
        })
    });

    it('returns can upload a haircut', function(done){
        var newhaircut = {
            stylename : 'Bob cut',
            firstname : 'Mbongeni',
            lastname: 'Maiketso',
            price: 200,
            date: Date.now(),
            discount: 0
        }
        superagent.post(URL_ROOT+'/newhaircut',newhaircut, function(error, res){
            assert.ifError(error);
            assert.equal(res.body.haircut.stylename, 'Bob cut');
            assert.equal(res.body.haircut.personCut.lastname, 'Maiketso');
            done();
        })
    });

    it('returns haircuts in a given date range', function(done){
        done();
    });

    it('returns haircuts over a given price', function(done){
        done();
    });
});