#!/usr/bin/env node
const express = require("express");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const http = require("http");
const { Server } = require("socket.io");
const passport = require("passport");
const dotenv = require("dotenv");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const cluster = require("cluster");
const { fork } = require("child_process");
const numCPUs = require("os").cpus().length;
dotenv.config();

const logger = require(`${__dirname}/helpers/winston.helper`);
const {
  handleChatMessage,
  handleAllChat,
} = require(`${__dirname}/handlers/chat.handler`);
const albumsRouter = require(`${__dirname}/routes/albums.route`);
const loginRouter = require(`${__dirname}/routes/login.route`);
const homeRouter = require(`${__dirname}/routes/home.route`);
const logoutRouter = require(`${__dirname}/routes/logout.route`);
const registerRouter = require(`${__dirname}/routes/register.route`);
const infoRouter = require(`${__dirname}/routes/info.route`);
const randomNumbersRouter = require(`${__dirname}/routes/random.route`);
const db = require(`${__dirname}/db`);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS_CREDENTIALS,
    }),
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
    secret: "Hola!",
  })
);

app.use((request, response, next) => {
  //loggea todas las peticiones al sv
  logger.log("info", `Petición recibida: ${request.method} - ${request.path}`);
  next();
});

app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
db.connect();

app.use("/info", infoRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/logout", logoutRouter);
app.use("/api/productos-test", albumsRouter);
app.use("/api/randoms", randomNumbersRouter);

app.use("*", (request, response) => {
  //loggea todas las peticiones al sv que no hagan match a una ruta.
  logger.log("warn", `Petición recibida: ${request.method} - ${request.path}`);
  response.status(404).json({
    message: "La ruta solicitada no existe",
  });
});

io.on("connection", (socket) => {
  handleAllChat(socket);
  handleChatMessage(socket, io);
});

if (cluster.isPrimary && argv.mode === "cluster") {
  console.log("Inicializando en modo cluster");
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker: ${worker.process.pid} died`);
  });
} else {
  server.listen(PORT, () => {
    console.log(
      `Corriendo en el puerto: ${PORT}. URL: http://localhost:${PORT}. Worker: ${process.pid}`
    );
  });
}
