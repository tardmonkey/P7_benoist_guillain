// [=>] IMPORT SECT.
// -
const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// allows to access the file system paths
const path = require("path");

// Helmet module_
// Enhances security, protects app from various vulnerabilities such as :
// cross-site scripting, sniffing and clickjacking.
// Full doc => https://helmetjs.github.io/
const helmet = require("helmet");

// [=>] Create & Execute express App
// -
const app = express();

// app.use(cors());

// [=>] Middlewares
// -
// or : http://expressjs.com/en/resources/middleware/cors.html
// CORS midWare general | default options // allows app to access to API
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Cookie"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// for parsing body application/json
app.use(express.json());

// cookie Parser
app.use(cookieParser());

// Helmet middleware
app.use(helmet());

// routing manager for 'images' folder
app.use("/images", express.static(path.join(__dirname, "images")));

// for this route => use *dirname*Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// [=>] EXPORT App
// -
module.exports = app;
