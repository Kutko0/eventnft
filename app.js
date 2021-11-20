const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    console.log("kokot");
    next();
});

app.use(eventRoutes);

const server = http.createServer(app);

server.listen(3000);
