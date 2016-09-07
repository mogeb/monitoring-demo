var express = require('express');
var app = express();
//var api = require('./routes/api');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongodb = require('mongodb');
var randomstring = require("randomstring");

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
    console.log(new Date().toISOString() + ": server started on port " + app.get('port'));
});

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT+'/demoDB';


app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/api', api);
app.get('/', function(req, res) {
     res.render('index');
//    res.sendFile('index.html');
});

app.post('/work', function(req, res) {
  for(var i = 0; i < 999999999; i++) {
    // Do useless work
    i--;
    i++;
  }

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      res.sendStatus(300);
    } else {
      // Get the documents collection
      var collection = db.collection('users');

      var user1 = {name: randomstring.generate(), role: randomstring.generate(), job: randomstring.generate()};
      var user2 = {name: randomstring.generate(), role: randomstring.generate(), job: randomstring.generate()};
      var user3 = {name: randomstring.generate(), role: randomstring.generate(), job: randomstring.generate()};

      // Insert some users
      collection.insert([user1, user2, user3], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted documents into the "users" collection.');
        }
      });
      //Close connection
      db.close();
      res.sendStatus(200);
    }
  });

})

app.use('/', function(req, res) {
      res.sendStatus(404);
})

module.exports = app;

