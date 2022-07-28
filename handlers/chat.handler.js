const chatController = require("../controllers/chat.controller");

function handleAllChat(socket) {
  socket.on("get-chat", () => {
    chatController.getChat(socket);
  });
}

function handleChatMessage(socket, io) {
  socket.on("chat-message", (message) => {
    chatController.add(message, io);
  });
}

module.exports = { handleChatMessage, handleAllChat };
