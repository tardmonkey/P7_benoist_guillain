
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// allows to access the file system paths
const path = require("path");

// Helmet module_
// Enhances security, protects app from various vulnerabilities such as :
// cross-site scripting, sniffing and clickjacking.
// Full doc => https://helmetjs.github.io/
const helmet = require("helmet");

const app = express();



//CORS
//  CORS
//    CORS
var whitelist = ['http://localhost:8080/*', 'http://localhost:3000/*']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 
//gérer les cors dynamiquement
app.use(cors());

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

module.exports = app;
