const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  author: {
    id: String,
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String,
  },
  text: String,
});

const Chat = mongoose.model("Chat", chatSchema);

async function getAllChat() {
  try {
    const chat = await Chat.find();
    return chat;
  } catch (error) {
    throw "Hubo un error al recuperar los mensajes del chat";
  }
}

function addMessage(message) {
  try {
    const newMessage = new Chat(message);
    newMessage.save();
    return newMessage;
  } catch (error) {
    throw "Hubo un error al agregar un mensaje";
  }
}

module.exports = {
  getAllChat,
  addMessage,
};
