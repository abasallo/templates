var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config');

require('mongoose').connect(config.mongoConnectionString);

app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('./middleware/cors'));

var authenticationRoutes = require('./routes/authentication');
app.post('/authenticate', authenticationRoutes.post);

app.use('/api', require('./middleware/authentication'));

var usersRoutes = require('./routes/users');
app.get('/api/users', usersRoutes.getAll);
app.get('/api/users/:user_id', usersRoutes.get);
app.post('/api/users', usersRoutes.post);
app.put('/api/users/:user_id', usersRoutes.put);
app.delete('/api/users/:user_id', usersRoutes.delete);

app.listen(config.port);
console.log('Magic happens on port ' + config.port);