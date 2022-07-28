const express = require("express");
const path = require("path");
const homeRouter = express.Router();

homeRouter.use(
  express.static(path.join(__dirname, "..", "/public/handlebars"))
);

homeRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "/public/home.html"));
});

module.exports = homeRouter;
