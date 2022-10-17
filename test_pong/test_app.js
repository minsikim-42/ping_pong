const socket = io();

let champ = -1;

// var player = 2;
// let W = 700;
// let H = 500;
// let bar_d = 50;
// let UD_d = 20;
let A_score = 19;
let B_score = 19;

// let x = 0;
// let y = 0;
// let v_x = 5;
// let v_y = 5;

var data = {
	game: {
		H: 400,
		W: 600,
		UD_d: 0,
		bar_d: 0
	},

	p1: {
		mouse_y: 0
	},

	p2: {
		mouse_y: 0
	},

	ball: {
		x: 0,
		y: 0,
		v_x: 0,
		v_y: 0
	}
};

socket.addEventListener("p1", (data) => {
	console.log("p1");
	socket.emit("p1", mouseY);
	canvas.addEventListener("mousemove", getMousePos);
});

// loop = setInterval(() => {
// 	socket.emit("p1", mouseY);
// }, 1000/30);

socket.on("is_you", (_champ) => {
	champ = _champ;
});

app_loop = setInterval(() => {
	if (champ % 2 === 1) {
		data.p1.mouse_y = mouseY;
		socket.emit("p1", mouseY);
	}
	else if (champ % 2 === 0) {
		data.p2.mouse_y = mouseY;
		socket.emit("p2", mouseY);
	}
}, 1000 / 30);

socket.on("game_data", (_data) => {
	data.game.H = _data.game.H;
	data.game.W = _data.game.W;
	data.game.UD_d = _data.game.UD_d;
	data.game.bar_d = _data.game.bar_d;
	// data.p1.mouse_y = _data.p1.mouse_y;
	// data.p2.mouse_y = _data.p2.mouse_y;
	data.ball.x = _data.ball.x;
	data.ball.y = _data.ball.y;
	data.ball.v_x = _data.ball.v_x;
	data.ball.v_y = _data.ball.v_y;
	console.log(data);
	// data = _data;
	// console.log(`game_data ${data.mouse_x}, ${data.mouse_y}`);
});