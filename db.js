const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_CREDENTIALS, {
      dbName: process.env.MONGO_DATABASE,
    });
  } catch (error) {
    console.log(`Hubo un error al conectarse con la base de datos: ${error}`);
  }
}

module.exports = { connect };
