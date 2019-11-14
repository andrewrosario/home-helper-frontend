export function enterChatRoom(socket, room) {
    console.log('enter chat room room', room, socket)
    socket.emit('room', `chat_id_${room.id}`)
    socket.emit('room', `task_id_${room.id}`)
    socket.emit('room', `materials_id_${room.id}`)
}