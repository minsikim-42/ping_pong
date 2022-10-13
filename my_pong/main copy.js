const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');

const port = 3333;

app.listen(port);

function handler (req, res) {
    fs.readFile(__dirname + '/views/index.html', function( err, data) {
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

const server = http.createServer(app);


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
		socket.emit('start');
	}
});



server.listen(port, () => console.log("server start port: " + port));