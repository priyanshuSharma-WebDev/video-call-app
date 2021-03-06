require("dotenv").config()
const express = require('express');
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

app.use(cors(), express.json(), express.urlencoded({ extended: false }))
app.use('/', require("./routes/routes"));
const io = (module.exports.io = require("socket.io")(server));
const socketManager = require("./routes/socketManager");
io.on("connection", socketManager);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`App is alive on http://localhost:${port}`);
})