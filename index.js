var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);

var app = express();

//Bootstrap server
app.use(bodyParser.json());
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('listening on port 3000!');