var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile('/home/d3ancole1995/Web/index.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
});
io.on('connection', function(socket){
  socket.on('chat message', function(user,msg){
    console.log('message: ' + user + ' - ' + msg);
    io.emit('chat message', user,msg);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});