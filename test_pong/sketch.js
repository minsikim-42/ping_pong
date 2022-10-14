
function setup() {
  createCanvas(W, H);
}

function draw() {
  frame();
  // twinkle();
  
  draw_score();
  
  fill('white');
  draw_p1_bar();
  draw_p2_bar();

  if (player === 2)
    draw_ball(200, 200);
}

function frame() {
  rect(0, 0, 20, H); // | <-
  rect(W - 20, 0, 20, H); // -> |
  rect(0, 0, W, 20);
  rect(0, H - 20, W, 20);
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
  rect(W/3 - 30, 25, 60, 50);
  rect(2*W/3, 25, 60, 50);
  noErase();
  
  
  fill('blue');
  textSize(50);
  textAlign(CENTER);
  text('VS', W/2, 60);
  
  fill('black');
  textSize(50);
  textAlign(LEFT);
  text(A_score, W/3 - 30, 60);
  textAlign(LEFT);
  text(B_score, 2*W/3, 60);
}

function draw_p1_bar() {
  erase();
  rect(bar_d, data.p1.mouse_y - 1000, 20, 2000);
  // rect(W - bar_d - 21, data.p1.mouse_y - 1000, 21, 2000);
  noErase();
  
  // let c = color("yellow");
  // fill(c);
  rect(bar_d, data.p1.mouse_y - 40, 20, 80);
  // rect(W - bar_d - 20, data.p1.mouse_y - 40, 20, 80);
}

function draw_p2_bar() {
  erase();
  // rect(bar_d, data.p2.mouse_y - 1000, 20, 2000);
  rect(W - bar_d - 21, data.p2.mouse_y - 1000, 21, 2000);
  noErase();
  
  // let c = color("yellow");
  // fill(c);
  // rect(bar_d, data.p2.mouse_y - 40, 20, 80);
  rect(W - bar_d - 20, data.p2.mouse_y - 40, 20, 80);
}

function draw_ball(b_x, b_y) {
  erase();
  rect(b_x + x - v_x, b_y + y - v_y, 20 + 2 * abs(v_x), 20 + 2 * abs(v_y));
  noErase();
  rect(b_x + x, b_y + y, 20, 20);
  
  check_wall(b_x, b_y);
  check_bar(b_x, b_y);
  
  x += v_x;
  y += v_y;
}

function check_wall(b_x, b_y) {
  if (b_x + x > W - 20) {
    v_x *= -1;
    A_score += 1;
  }
  else if (b_x + x < 0) {
    v_x *= -1;
    B_score += 1;
  }
  if (b_y + y > H - UD_d - 20) {
    v_y *= -1;
  }
  else if (b_x + y < UD_d) {
    v_y *= -1;
  }
}

function check_bar(b_x, b_y) {
  if (b_x + x > bar_d & b_x + x < bar_d + 20 & abs(b_y + y - data.mouse_y) < 40) {
    v_x = abs(v_x);
  }
  else if (b_x + x < W - bar_d - 20 & b_x + x > W - bar_d - 40 & abs(b_y + y - data.mouse_y) < 40) {
    if (v_x > 0)
    v_x *= -1;
  }
}

