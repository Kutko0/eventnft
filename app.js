const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    console.log("kokot");
    next();
});

const server = http.createServer(app);

server.listen(3000);
