const express = require('express');
const port = process.env.PORT || 8000;
const server = express()
  .use(express.static(__dirname + '/../../build'), (req, res, next) => next())
  .get('*', function(req, res) {res.sendFile('index.html', {root: path.join(__dirname, '/../../build/')})})
  .listen(port, () => console.log(`Listening on ${ port }`));
var io = require('socket.io')(server);
// var app = express()

server

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
    socket.on('sendMessage', function(message, id) {
        console.log('index sendMessage', message)
        io.sockets.in(`chat_id_${id}`).emit('receiveMessage', message);
    })
    socket.on('sendUpdateTask', function(tasks, id) {
        console.log('index updateTask', id)
        io.sockets.in(`task_id_${id}`).emit('receiveUpdateTask', tasks);
    })
    socket.on('sendUpdateMaterials', function(materials, id) {
        console.log('index update materials')
        io.sockets.in(`materials_id_${id}`).emit('receiveUpdateMaterials', materials);
    })
    socket.on('disconnect', function(){});
})


