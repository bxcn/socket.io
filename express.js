var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('./mysql');

app.set('view engine', 'ejs');
app.set('views',__dirname+'/');
app.set('view options', {layout:false});
// get
app.route('/').get(function( req, res, next ) {
  res.render('index',{ title: 'Hey', message: 'Hello there!'});
});

io.on('connection', function (socket) {
  //服务器默认消息
  socket.emit('server', { say: '你好，欢迎光临！' });

  // 加入聊天
  socket.on('join', function( name ) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', { say: name + '加入进来了！'})
  });

  
  // 客户端发送消息，服务器端接收后，广播到所有聊天窗口
  socket.on('server', function (name,data) {
    socket.broadcast.emit('client', {name:socket.nickname, say:data.say });
  });
});

server.listen(3001);