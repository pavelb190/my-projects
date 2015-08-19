
var express = require('express'),
    
    mongoose = require('mongoose'),

    app = express();

mongoose.connect('mongodb://localhost/my_test_db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {

    //console.log('MongoDB-connection established!..');
});

var userSchema = mongoose.Schema({
    nickname: String, password: String
}, {collection: 'Users'});

var User = mongoose.model('User', userSchema);

function checkUser(req, res, next)
{
    console.log('In CheckUser-Method!..');

    var _user = new User({ nickname: 'PavelB', password: '123' });

    /*
    _user.save(function(err, user) {
        if (err) {
            console.log('UserSaveError: ' + err);
        }
        else {
            console.log(user);
        }
    });
    */

    next();
}

app.get('/', checkUser, function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello There!!' });
});

app.set('view engine', 'jade');

var server = app.listen(3000, function() {

    var host = server.address().address,
        port = server.address().port;

    console.log('Server running at http://%s:%s...', host, port);
});