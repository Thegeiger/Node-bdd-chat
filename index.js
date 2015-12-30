var express       = require("express");
var app           = express();
var server        = require('http').Server(app);
var io            = require('socket.io')(server);
var cookies       = require('cookie-parser');
var mysql         = require('mysql');
var bodyParser    = require('body-parser');

var port          = (process.env.PORT || 5000);

server.listen(port);
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookies());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
console.log("http server listening on %d", port);

// conection SQL

var connection    = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'nodejs',
  port     : '8889'
});

connection.connect();

var pool          = mysql.createPool({
  connectionLimit : 2,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  port            : '8889'
});

// Socket

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    io.sockets.emit('response', {
      msg: data,
      sender: user_name
    });
  });
});

// user var

var user_name;

// ROUTES

// GET
app.get('/', function(request, response) {
    if (request.cookies.user == undefined || request.cookies.pass == undefined){
      response.render('pages/connection', {
        title: 'Hello - Please Login To Your Account',
        err: ""
        });
    }
    else {
        user_connection(request.cookies.user, request.cookies.pass, response, false);
    }
});

app.get('/account', function(request, response) {
  response.render('pages/account', {
    title: 'Create a new account',
    err: ""
  });
});

// POST
app.post('/', function(req, res){
  // if user try to connect
  var name      = req.body['name'];
  var password  = req.body['password'];

  if (req.body['msg'] != undefined)
    return ;
  user_connection(name, password, res, true);
  console.log("login ... " + req.body['name']);
});

app.post('/account', function(req, res){
  // if user try to connect
  var name      = req.body['name'];
  var password  = req.body['password'];

  user_incription(name, password, res);
  console.log("register ... " + req.body['name']);
});

// fonction js
function user_connection (name, password, res, cook) {
  connection.query("SELECT `name` FROM `user` WHERE `password` LIKE " + "'" + password + "'" + " AND `name` LIKE " + "'" + name + "'" , function(err, rows, fields) {
    if (rows[0] == undefined)
      {
        console.log("account doesn't exit");
        res.render('pages/connection', {
          title: 'Please Retry To Login To Your Account',
          err: "Your password or name is invalide."
        });
      }
    else if (err)
      {
        console.log("internal server ddb error");
        res.render('pages/connection', {
          title: 'Please Retry To Login To Your Account',
          err: "Internal server ddb error"
        });
      }
    else
      {
        console.log('connection');
        if (cook == true)
          {
            res.cookie('user', name, { maxAge: 900000 });
            res.cookie('pass', password, { maxAge: 900000 });
          }
        user_name = name;
        res.render('pages/index', { title: 'My_game' });
      }
  });
}

function user_incription (name, password, res) {
  connection.query("INSERT INTO `user` (`name`, `password`) VALUES (" + "'" + name + "', '" + password + "'" + ")", function(err, rows, fields) {
    if (err)
      {
        console.log("internal server ddb error");
        res.render('pages/account', {
          title: 'Create a new account',
          err: "Name already exist"
        });
      }
    else
      {
        console.log('account create');
        res.redirect('/');
      }
  });
}

// close

//process.on('SIGINT', function() {
//  server.close(function() {
//    process.exit(0);
//  });
//});
//
//server.on('close', function() {
//  connection.end();
//  console.log("\nBye Bye Master :)");
//});