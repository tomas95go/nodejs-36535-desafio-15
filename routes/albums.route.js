const express = require("express");
const path = require("path");
const albumsRouter = express.Router();

const albumsController = require(path.join(
  __dirname,
  "..",
  "controllers/albums.controller"
));

albumsRouter.get("/", albumsController.getAll);

module.exports = albumsRouter;
