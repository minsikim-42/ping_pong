const socketio = require("socket.io");
const express = require("express");
const http = require("http");
//express 서버 생성
const app = express();
const port = 3333;

const clients = new Map();

app.set("view engine", "pug");
app.set("views", __dirname + "/");
app.use("/test_pong/test_app.js", express.static(__dirname + "/test_app.js"));
app.get("/", (req, res) => {
	res.render("test_home");
})
app.get("/alive", (req, res) => { // ???
	let rtn = [];
	clients.forEach((value, key) => {
		rtn.push(value);
	});
	res.send(rtn);
});

const server = http.createServer(app);
const io = socketio(server);

let loop = null;
let obj = "hi";
function handler(socket) {
	console.log(`connected : ` + socket.id);
	console.log(io.of('/').adaptor);

	socket.on("p1", (data) => {
		console.log(`server: hi~`);
	})

	loop = setInterval(() => {
		io.emit("game_data", obj);
	}, 1000/30);
};

io.on("connection", handler);

server.listen(port, () => console.log("server start port: " + port));