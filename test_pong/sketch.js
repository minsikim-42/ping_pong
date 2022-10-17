
function setup() {
	createCanvas(data.game.W, data.game.H);
}

function draw() {
	frame();
	// twinkle();

	draw_score();

	fill('white');
	draw_p1_bar();
	draw_p2_bar();

	if (data.ball.x != 0)
		draw_ball(data.ball.x, data.ball.y);
}

function frame() {
	rect(0, 0, 20, data.game.H); // | <-
	rect(data.game.W - 20, 0, 20, data.game.H); // -> |
	rect(0, 0, data.game.W, 20);
	rect(0, data.game.H - 20, data.game.W, 20);
}

function twinkle() {
	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255);
	}
}

function draw_score() {
	erase();
	rect(data.game.W / 3 - 30, 25, 60, 50);
	rect(2 * data.game.W / 3, 25, 60, 50);
	noErase();


	fill('blue');
	textSize(50);
	textAlign(CENTER);
	text('VS', data.game.W / 2, 60);

	fill('black');
	textSize(50);
	textAlign(LEFT);
	text(A_score, data.game.W / 3 - 30, 60);
	textAlign(LEFT);
	text(B_score, 2 * data.game.W / 3, 60);
}

function draw_p1_bar() {
	erase();
	rect(data.game.bar_d, data.p1.mouse_y - 1000, 20, 2000);
	// rect(W - data.game.bar_d - 21, data.p1.mouse_y - 1000, 21, 2000);
	noErase();

	// let c = color("yellow");
	// fill(c);
	rect(data.game.bar_d, data.p1.mouse_y - 40, 20, 80);
	// rect(W - data.game.bar_d - 20, data.p1.mouse_y - 40, 20, 80);
}

function draw_p2_bar() {
	erase();
	// rect(data.game.bar_d, data.p2.mouse_y - 1000, 20, 2000);
	rect(data.game.W - data.game.bar_d - 21, data.p2.mouse_y - 1000, 21, 2000);
	noErase();

	// let c = color("yellow");
	// fill(c);
	// rect(data.game.bar_d, data.p2.mouse_y - 40, 20, 80);
	rect(data.game.W - data.game.bar_d - 20, data.p2.mouse_y - 40, 20, 80);
}

function draw_ball() {
	erase();
	rect(data.ball.old_x - 2, data.ball.old_y - 2, 20 + 4, 20 + 4);
	noErase();
	rect(data.ball.x, data.ball.y, 20, 20);
}

// function check_wall(data.ball.x, data.ball.y) {
// 	if (data.ball.x + x > W - 20) {
// 		v_x *= -1;
// 		A_score += 1;
// 	}
// 	else if (data.ball.x + x < 0) {
// 		v_x *= -1;
// 		B_score += 1;
// 	}
// 	if (data.ball.y + y > H - UD_d - 20) {
// 		v_y *= -1;
// 		return 1;
// 	}
// 	else if (data.ball.x + y < UD_d) {
// 		v_y *= -1;
// 		return 1;
// 	}
// 	return 0;
// }

// function check_bar(data.ball.x, data.ball.y) {
// 	if (data.ball.x + x > data.game.bar_d & data.ball.x + x < data.game.bar_d + 20 & abs(data.ball.y + y - data.mouse_y) < 40) {
// 		v_x = abs(v_x);
// 	}
// 	else if (data.ball.x + x < W - data.game.bar_d - 20 & data.ball.x + x > W - data.game.bar_d - 40 & abs(data.ball.y + y - data.mouse_y) < 40) {
// 		if (v_x > 0)
// 			v_x *= -1;
// 	}
// }

