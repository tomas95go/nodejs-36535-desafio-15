const path = require("path");
const joiHelper = require(path.join(__dirname, "..", "/helpers/joi.helper"));
const chatModel = require(path.join(__dirname, "..", "/models/chat.model"));

async function getChat(socket) {
  const chat = await chatModel.getAllChat();
  socket.emit("chat", chat);
}

async function add(message, io) {
  try {
    const { author, text } = message;
    const { id, nombre, apellido, edad, alias, avatar } = author;
    await joiHelper.authorSchema.validateAsync({
      id,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    });
    await joiHelper.messageTextSchema.validateAsync({
      text,
    });
    io.emit("chat-message-ui", message);
    chatModel.addMessage(message);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getChat,
  add,
};
