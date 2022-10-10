const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const port = 3333;

//express 서버 생성
const app = express();
app.get("/ping", (req, res) => res.sendFile(`${__dirname}/game.html`));
app.get("/sketch.js", (req, res) => res.sendFile(`${__dirname}/sketch.js`));
const server = http.createServer(app);

const io = socketio(server);
io.on("connection", (socket) => {
	const { url } = socket.request;
	console.log(`연결됨: ${url}`);
});

server.listen(port, () => console.log("server start port: " + port));