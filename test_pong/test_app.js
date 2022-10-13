const socket = io();

const canvas = document.getElementById("pong");

const ctx = canvas.getContext('2d');

socket.addEventListener("p1", (data) => {
	console.log("p1");
	function getMousePos(ev) {
		socket.emit("p1", { });
	}
	canvas.addEventListener("mousemove", getMousePos);
});

socket.on("game_data", (data) => {
	console.log(`game_data ${data}`);
});