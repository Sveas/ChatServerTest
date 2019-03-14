// undirbúningsskipanir, svipaðar #include í c++
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// skilgreinum rútu/route inn á grunnslóðina sem er localhost:3000/
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// hlustum eftir þeim atburði að einhver client/socket tengis servernum/io-inu
io.on('connection', function(socket){
  console.log('a user connected');
  // hlustum eftir þeim atburði að einhver client/socket aftengist
  socket.on('disconnect', function(){
  	console.log('a user has disconnected');
  });
  // hlustum eftir þeim atburði að einhver client/socket sendi skilaboð inn á spjallsíðuna
  socket.on('chat message', function(msg){
  	console.log('message: '+msg);
  	// látum chat message atburð verða á servernum en þá geta allir clientar hlustað
  	// eftir honum og brugðist við, við sendum líka skilaboðin (msg breytuna) með svo
  	// clientarnir geti birt hana í html-inu sem þeir eru með
  	io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

