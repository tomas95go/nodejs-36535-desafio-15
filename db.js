const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: process.env.MONGO_DATABASE,
    });
  } catch (error) {
    console.log(`Hubo un error al conectarse con la base de datos: ${error}`);
  }
}

module.exports = { connect };
