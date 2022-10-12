const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const port = 3333;

//express 서버 생성
const app = express();
app.get("/", (req, res) => res.sendFile(`${__dirname}/client.html`));
app.get("/ping", (req, res) => res.sendFile(`${__dirname}/game.html`));
app.get("/sketch.js", (req, res) => res.sendFile(`${__dirname}/sketch.js`));

const server = http.createServer(app);

const io = socketio(server);

var player = 0;
io.on("connection", (socket) => {
	var player1;
	var player2;
	const { url } = socket.request;
	player++;
	if (player === 1)
		player1 = socket.id;
	else if (player === 2)
		player2 = socket.id;
	else // viewer
		;
	console.log(`연결됨: ${url}, client id: ${socket.id}`);
	socket.on('button', (msg) => {
		console.log(`here comes new chellenger! ${msg}, player : ${player}`);
	});
	socket.on('chat', msg => {
		console.log(`recieve message : ${msg}`);
	});
	if (player >= 2) {
		console.log(`start!`);
		io.emit('start', 1);
	}
});



server.listen(port, () => console.log("server start port: " + port));