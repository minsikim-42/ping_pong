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
// app.get("/", (req, res) => { res.render("test_home"); })
app.get("/", (req, res) => res.sendFile(`${__dirname}/test.html`));
app.get("/test_pong/sketch.js", (req, res) => res.sendFile(`${__dirname}/sketch.js`));
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
let champ = 0;
var data = {
	p1 : {
		mouse_x: 0,
		mouse_: 0
	},
	p2 : {
		mouse_x: 0,
		mouse_: 0
	},
	ball : {
		x: 200,
		y: 200,
		v_x: 5,
		v_y: 5
	}
};

function handler(socket) {
	champ++;
	socket.emit("is_you", champ);
	console.log(`connected : ` + socket.id);
	console.log(io.of('/').adaptor);

	socket.on("p1", (m_y) => {
		// data.mouse_x = m_x;
		data.p1.mouse_y = m_y;
		console.log(`receive p1 m_ : ${m_y}`);
		console.log(`receive p1 data_m : ${data.p1.mouse_x}, ${data.p1.mouse_y}`);
	})
	socket.on("p2", (m_y) => {
		// data.mouse_x = m_x;
		data.p2.mouse_y = m_y;
		console.log(`receive p2 m_ : ${m_y}`);
		console.log(`receive p2 data_m : ${data.p2.mouse_x}, ${data.p2.mouse_y}`);
	})

	loop = setInterval(() => {
		io.emit("game_data", data);
		if (champ >= 2) {
			ball_engine();
		}
	}, 1000/30);
};

function ball_engine(){

}

io.on("connection", handler);

server.listen(port, () => console.log("server start port: " + port));