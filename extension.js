var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql      = require('mysql');
app.get('/', function(req, res){
    res.sendFile(__dirname + '/extension.html');
});
io.on('connection', function(socket){
    console.log("connected");
    socket.on('extension', function(user){
    });
    socket.on('client', function(email, hash, id) {
        io.emit('client', {'email':email,'hash':hash,'id':id});
    })
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
