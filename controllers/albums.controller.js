const path = require("path");
const products = require(path.join(__dirname, "..", "models/albums.model"));
const logger = require(path.join(__dirname, "..", "helpers/winston.helper"));

function getAll(request, response) {
  try {
    response.status(200).json({
      message: "Lista de productos recuperada con éxito",
      products,
    });
  } catch (error) {
    //loggea los errores que pasaron al tratar de recuperar los productos
    logger.log(
      "error",
      `Petición recibida: ${request.method} - ${request.path} con error ${error}`
    );
    response.status(404).json({
      message: "Hubo un error al recuperar la lista de productos",
    });
  }
}

module.exports = {
  getAll,
};
