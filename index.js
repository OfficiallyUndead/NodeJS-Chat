var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql      = require('mysql');
/* Change the values below to reflect your mysql connection settings */
var connection = mysql.createConnection({
  host     : 'localhost', //MySQL Hostname
  user     : 'root', //MySQL Username
  password : 'password', //MySQL Password
  database : 'chat' //MySQL Database
});

connection.connect();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
  console.log('A user connected');
  socket.on('user connect', function(user){
    global.user = user;
    var queryString = 'SELECT id FROM users WHERE name = ?';
 
    connection.query(queryString, [global.user], function(err, rows, fields){
      if(err)
        console.log(err);
      else
      {
      	if(rows.length == 0)
        {
	      var newuser  = {name:global.user,online:1};
          var query = connection.query('INSERT INTO users SET ?', newuser, function(err, result) {
	        if(err)
	          console.log(err);
	      });
        }
	    else
	    {
	      connection.query('UPDATE users SET online = 1 WHERE name = ?', [global.user], function(err, rows, fields){
	        if(err)
	          console.log(err);
	      });
	    }
        
      }
    });
    connection.query('SELECT msg.message,user.name FROM messages msg LEFT JOIN users user ON msg.user = user.id ORDER BY msg.when DESC LIMIT 50', function(err, messages, fields) {
      if (!err)
      {
      	connection.query('SELECT name FROM users WHERE online = 1 AND name != ?', [global.user], function(err, users, fields) {
      	  if(!err)
      	  {
	        socket.emit('user connected',messages,users)
    	    io.emit('another user connected', global.user);
      	  }
      	});
      }
      else
        console.log('Error while performing Query.');
    });
    //connection.end();
  });
  socket.on('chat message', function(user,msg){
    var user = user; 
    var queryString = 'SELECT id FROM users WHERE name = ?';

    connection.query(queryString, [user], function(err, rows, fields) {
      if(err)
	    throw err;
      else
      {
	    var message  = {user: rows[0].id,message:msg};
	    var query = connection.query('INSERT INTO messages SET ?', message, function(err, result) {
	    if(!err)
		  io.emit('chat message', user,msg);
	    else
		  console.log(err);
	  });
      }
    });
  });
  
  
  /*
  * Here we process the user disconnecting. 
  * We will update the database to set the user offline
  */
  socket.on('disconnect', function (){
    connection.query('UPDATE users SET online = 0 WHERE name = ?', [global.user], function(err, rows, fields){
	  if(err)
	    console.log(err);
	  else
	    io.emit('user disconnected', global.user);
    });
  });
});
/*
* Here we set the listening port, You can use any port you wish. 
* For external access, you will need to port forward on your router.
* For this repo, I will be using port 8080 as the listen port
* (this will avoid issues with an already running http server & it's easy to remember)
*/
http.listen(8080, function(){
  console.log('listening on *:8080');
});