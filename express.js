var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views',__dirname+'/');
app.set('view options', {layout:false});

// get
app.get('/', function( req, res, next ) {
  res.render('index',{ title: 'Hey', message: 'Hello there!'});
});

io.on('connection', function (socket) {
  socket.emit('client', { say: '你好，欢迎光临！' });
  socket.on('server', function (data) {
    console.log(+new Date()+'-'+data.say);
    socket.emit('client', { say: '我收到您的信息了' });
  });
});

server.listen(3001);