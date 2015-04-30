/*eslint-env browser, jquery */
// Create the canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;
$(canvas).attr('id', 'canvas');
$('#game').append(canvas);

// Adds text
ctx.font = '24px Helvetica';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';
ctx.fillStyle = 'white';
ctx.fillText('Click to play', 300, 32);

var playing = false;
var start1 = false;
var start2 = false;

// Players
var player1 = {
	speed: 4,
	x: 100,
	y: 100,
	dx: 0,
	dy: 0,
	alive: true
};

var player2 = {
	speed: 4,
	x: 500,
	y: 500,
	dx: 0,
	dy: 0,
	alive: true
};

// Initializes the snakes to move
var init = function () {
	playing = true;
};

// Resets state in preparation for a new game
var reset = function () {
	ctx.clearRect(0, 0, width, height);
	start1 = false;
	start2 = false;
	player1.x = 100;
	player1.y = 100;
	player1.dx = 0;
	player1.dy = 0;
	player1.alive = true;
	player2.x = 500;
	player2.y = 500;
	player2.dx = 0;
	player2.dy = 0;
	player2.alive = true;
};

// Handle keyboard controls
var keysDown = {};

addEventListener('click', function () {
	if (!playing) {
		reset();
		init();
	}
}, false);

addEventListener('keydown', function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function (e) {
	delete keysDown[e.keyCode];
}, false);

// Checks if a collision occurred
var check = function (player) {
	var x = player.x;
	var y = player.y;
	if (x < 0 || y < 0 || x > 600 || y > 600) {
		player.alive = false;
	}
	var imageData = ctx.getImageData(x + 1, y + 1, 5, 5);
	if (imageData.data[3] !== 0) {
		player.alive = false;
	}
};

// Draws the snake
var draw = function (player) {
	player.x += player.dx;
	player.y += player.dy;
	check(player);
	if (player.alive) {
		ctx.beginPath();
		ctx.rect(player.x, player.y, 5, 5);
		ctx.closePath();
		if (player === player1) {
			ctx.fillStyle = 'blue';
		} else {
			ctx.fillStyle = 'red';
		}
		ctx.fill();
	}
};

var gameOver = function() {
	if (!player1.alive) {
		if (!player2.alive) {
			var result = 'Both of you died..';
		} else {
			result = 'Red wins';
		}
	} else {
		result = 'Blue wins';
	}
	playing = false;
	ctx.fillStyle = 'white';
	ctx.fillText(result + '. Click to play again', 300, 32);
};

// Update game objects
var update = function () {
	if (!start1) { // Initializes Player 1 to go right
		player1.dx = player1.speed;
		start1 = true;
	}
	if (!start2) { // Initializes Player 2 to go left
		player2.dx = -1 * player2.speed;
		start2 = true;
	}
	if (38 in keysDown) { // Player 1 pressed up
		player1.dx = 0;
		player1.dy = -1 * player1.speed;
	}
	if (40 in keysDown) { // Player 1 pressed down
		player1.dx = 0;
		player1.dy = player1.speed;
	}
	if (37 in keysDown) { // Player 1 pressed left
		player1.dx = -1 * player1.speed;
		player1.dy = 0;
	}
	if (39 in keysDown) { // Player 1 pressed right
		player1.dx = player1.speed;
		player1.dy = 0;
	}
	if (87 in keysDown) { // Player 2 pressed up
		player2.dx = 0;
		player2.dy = -1 * player2.speed;
	}
	if (83 in keysDown) { // Player 2 pressed down
		player2.dx = 0;
		player2.dy = player2.speed;
	}
	if (65 in keysDown) { // Player 2 pressed left
		player2.dx = -1 * player2.speed;
		player2.dy = 0;
	}
	if (68 in keysDown) { // Player 2 pressed right
		player2.dx = player2.speed;
		player2.dy = 0;
	}
	draw(player1);
	draw(player2);
	if (!player1.alive || !player2.alive) {
		gameOver();
	}
};

// The main game loop
var main = function () {
	if (playing) {
		update();
	}
	requestAnimationFrame(main);
};

// Starts the game
draw(player1);
draw(player2);
main();
