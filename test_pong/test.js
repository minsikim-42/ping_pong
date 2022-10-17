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
	game: {
		H: 400,
		W: 600,
		UD_d: 20,
		bar_d: 50
	},

	p1: {
		mouse_x: 0,
		mouse_y: 0,
		score: 0
	},
	p2: {
		mouse_x: 0,
		mouse_y: 0,
		score: 0
	},
	ball: {
		old_x: 100,
		old_y: 100,
		x: 100,
		y: 100,
		v_x: 4,
		v_y: 4
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
		// console.log(`receive p1 m_ : ${m_y}`);
		// console.log(`receive p1 data_m : ${data.p1.mouse_x}, ${data.p1.mouse_y}`);
	})
	socket.on("p2", (m_y) => {
		// data.mouse_x = m_x;
		data.p2.mouse_y = m_y;
		// console.log(`receive p2 m_ : ${m_y}`);
		// console.log(`receive p2 data_m : ${data.p2.mouse_x}, ${data.p2.mouse_y}`);
	})

	loop = setInterval(() => {
		io.emit("game_data", data);
		if (champ >= 2) {
			ball_engine();
			console.log(data);
		}
	}, 1000 / 30);
};

function ball_engine() {

	check_wall();
	check_bar();

	data.ball.old_x = data.ball.x;
	data.ball.old_y = data.ball.y;
	data.ball.x += data.ball.v_x;
	data.ball.y += data.ball.v_y;
}

function check_wall() {
	if (data.ball.x + data.ball.v_x > data.game.W - 20) { // right
		data.ball.v_x *= -1;
		data.p1.score += 1;
	}
	else if (data.ball.x + data.ball.v_x < 0) { // left
		data.ball.v_x *= -1;
		data.p2.score += 1;
	}
	if (data.ball.y + data.ball.v_y > data.game.H - data.game.UD_d - 20) { // down
		data.ball.v_y *= -1;
	}
	else if (data.ball.y + data.ball.v_y < data.game.UD_d) { // up
		data.ball.v_y *= -1;
	}
}

function check_bar() {
	if (data.ball.x + data.ball.v_x > data.game.bar_d && data.ball.x + data.ball.v_x < data.game.bar_d + 20 && Math.abs(data.ball.y + data.ball.v_y - data.p1.mouse_y) < 40) {
		data.ball.v_x = Math.abs(data.ball.v_x);
	}
	else if (data.ball.x + data.ball.v_x < data.game.W - data.game.bar_d - 20 && data.ball.x + data.ball.v_x > data.game.W - data.game.bar_d - 40 && Math.abs(data.ball.y + data.ball.v_y - data.p2.mouse_y) < 40) {
		if (data.ball.v_x > 0)
			data.ball.v_x *= -1;
	}
}


io.on("connection", handler);

server.listen(port, () => console.log("server start port: " + port));