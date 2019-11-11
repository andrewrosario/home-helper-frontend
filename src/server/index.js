const express = require('express');
const port = process.env.PORT || 8000;
const server = express()
  .use(express.static(__dirname + '/../../build'))
  .listen(port, () => console.log(`Listening on ${ port }`));
var io = require('socket.io')(server);

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
        console.log('sendMessage', message)
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

const chatMessage = (user_id, text, chat_room_id) => {
    return {
        user_id,
        text,
        chat_room_id,
        time: new Date().getTime()
    };
};


