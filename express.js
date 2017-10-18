var express = require('express');
var IO = require('socket.io');
var app = express();
var router = express.Router();
var server = require('http').Server(app);
// 创建socket服务
var socketIO = IO(server);

app.set('view engine', 'ejs');
app.set('views',__dirname+'/');
app.set('view options', {layout:false});

// get
router.get('/', function( req, res, next ) {
  res.render('index',{ title: 'Hey', message: 'Hello there!'});
});

socketIO.on('connection', function (socket) {
  socket.emit('client', { say: '你好，欢迎光临！' });
  socket.on('server', function (data) {
    console.log(+new Date()+'-'+data.say);
    socket.emit('client', { say: '我收到您的信息了' });
  });
});



app.use('/', router);
server.listen(3001);