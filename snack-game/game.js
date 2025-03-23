const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const displayScore = document.getElementById('score');
const gameOverText = document.getElementById('gameOver');

canvas.width = 500;
canvas.height = 500;

const box = 20;

let snake = [{ x: 220, y: 220 }];

let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let dx = box, dy = 0;
let score = 0;
let gameRunning = true;

document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    } else if (event.key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
});

function update() {
    if (!gameRunning) return;

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        displayScore.textContent = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "yellow";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

function gameOver() {
    gameRunning = false;
    gameOverText.classList.remove('hidden');
    setTimeout(() => {
        location.reload();
    }, 3000);
}

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
    }
}

setInterval(gameLoop, 100);