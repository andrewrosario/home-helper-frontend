export function leaveChatRoom(socket, room) {
    socket.emit('leave', `chat_id_${room.id}`)
    socket.emit('leave', `task_id_${room.id}`)
    socket.emit('leave', `materials_id_${room.id}`)
}