const http = require("http");
const app = require("./app");
const dotEnv = require("dotenv").config({ path: "./config/.env" });
const { sequelize } = require("./config/database");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);

app.set("port", port);


const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const listeningHandler = () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
};


const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", listeningHandler);
server.listen(port);

// (async function () {
//   await sequelize.sync({ alter: true }); 
  
// })();
