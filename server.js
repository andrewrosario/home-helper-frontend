var express = require('express');
var app = express();
var http = require('http')
const router = express.Router()

router.get('/', function(req, res){
  res.send({response: "Hello"}).status(200);
});

let server = http.createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 8000;

io.on('connection', function(socket){
    socket.on('leave',function(room){  
        try{
            console.log('[socket]','leave room :', room);
            socket.leave(room);
            socket.to(room).emit('user left', socket.id);
        }catch(e){
            console.log('[error]','leave room :', e);
            socket.emit('error','couldnt perform requested action');
        }
    })
    socket.on('room', function(room) {
        console.log('join room', room)
        socket.join(room);
    })
    socket.on('sendMessage', function(message) {
        io.sockets.in(`chat_id_${message.chat_room_id}`).emit('receiveMessage', chatMessage(message.user_id, message.text, message.chat_room_id));
    })
    socket.on('sendUpdateTask', function(id) {
        console.log('updateTask', id)
        io.sockets.in(`task_id_${id}`).emit('receiveUpdateTask', 'update');
    })
    socket.on('sendUpdateMaterials', function(id) {
        console.log('updateMaterials', id)
        io.sockets.in(`materials_id_${id}`).emit('receiveUpdateMaterials', 'update');
    })
    socket.on('disconnect', function(){});
});

server.listen(port, function(){
    console.log('listening on', port);
});

const chatMessage = (user_id, text, chat_room_id) => {
    return {
        user_id,
        text,
        chat_room_id,
        time: new Date().getTime()
    };
};

