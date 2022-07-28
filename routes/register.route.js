const express = require("express");
const path = require("path");
const registerController = require(path.join(
  __dirname,
  "..",
  "controllers/register.controller"
));
const registerRouter = express.Router();

registerRouter.use(
  express.static(path.join(__dirname, "..", "/public/handlebars"))
);

registerRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "/public/register.html"));
});

registerRouter.post("/", registerController.add);

module.exports = registerRouter;
