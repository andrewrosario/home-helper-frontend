export function enterChatRoom(socket, room) {
    socket.emit('room', `chat_id_${room.id}`)
    socket.emit('room', `task_id_${room.id}`)
    socket.emit('room', `materials_id_${room.id}`)
}