const express = require("express");
const path = require("path");
const logoutRouter = express.Router();

logoutRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "/public/logout.html"));
});

logoutRouter.get("/destroy", (request, response) => {
  request.session.user = "";
  request.session.destroy(function (err) {
    if (err) {
      return response.status(404).json({
        message: "An error ocurred",
      });
    }

    response.status(200).json({
      message: "Logout successful",
    });
  });
});

module.exports = logoutRouter;
