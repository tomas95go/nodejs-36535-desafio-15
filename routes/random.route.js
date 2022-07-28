const express = require("express");
const path = require("path");
const { fork } = require("child_process");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const randomNumbersRouter = express.Router();

randomNumbersRouter.get("/", (request, response) => {
  try {
    const forked = fork(path.join(__dirname, "..", "/helpers/random.helper"));
    const cant = request.query.cant ? request.query.cant : 100000000;

    forked.on("message", (result) => {
      response.status(200).json({
        message: `Números aleatorios recuperados con éxito ${argv.port}`,
        resultado: result,
      });
    });

    forked.send({ cant: cant });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al generar los números aleatorios",
    });
  }
});
module.exports = randomNumbersRouter;
