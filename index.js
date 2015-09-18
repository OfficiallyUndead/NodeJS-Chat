var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql      = require('mysql');
/* Change the values below to reflect your mysql connection settings */
var connection = mysql.createConnection({
  host     : 'hostname',
  user     : 'mysqlusername',
  password : 'mysqlpassword',
  database : 'mysqldatabase'
});

connection.connect();

app.get('/', function(req, res){
  res.sendFile('/home/node/index.html');
});
io.on('connection', function(socket){
  console.log('A user connected');
  socket.on('user connect', function(user){
    var user = user;
    var queryString = 'SELECT id FROM users WHERE name = ?';
 
    connection.query(queryString, [user], function(err, rows, fields) {
      if(err)
        console.log(err);
      else
      {
      	if(rows.length == 0)
        {
	        var newuser  = {name:user,online:1};
          var query = connection.query('INSERT INTO users SET ?', newuser, function(err, result) {
	            if(err)
	              console.log(err);
	          });
          }
	        else
	        {
	          connection.query('UPDATE users SET online = 1 WHERE name = ?', [user], function(err, rows, fields){
	            if(err)
	              console.log(err);
	          });
	        }
        }
      });
      connection.query('SELECT msg.message,user.name FROM messages msg LEFT JOIN users user ON msg.user = user.id ORDER BY msg.when ASC LIMIT 50', function(err, rows, fields) {
        if (!err)
        {
          socket.emit('user connected',rows)
    	    console.log('The solution is: ', rows);
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
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
