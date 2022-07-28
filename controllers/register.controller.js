const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require(path.join(__dirname, "..", "models/user.model"));
const saltRounds = 10;

async function add(request, response) {
  try {
    const newUser = request.body;

    const userExists = await userModel.check(newUser.email);

    if (userExists) {
      return response.status(409).json({
        message: `El email: "${newUser.email}" ya está siendo utilizado por otro usuario.`,
      });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    const addedUser = await userModel.add(newUser);
    response.status(200).json({
      message: "Nuevo usuario registrado con éxito",
      user: `Probando. Tus datos: ${addedUser}.`,
    });
  } catch (error) {
    response.status(404).json({
      message: "Hubo un error al registrar el usuario",
    });
  }
}

module.exports = {
  add,
};
