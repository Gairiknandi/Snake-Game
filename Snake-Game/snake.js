var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var currentScore = 0;
var highScore = 0;
var gameOver = false;

var snakeX = blockSize * 3;
var snakeY = blockSize * 3;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX = blockSize * 10;
var foodY = blockSize * 10;

$(window).on('load', function(e) {
    if( localStorage.getItem("highScore") ) {
        highScore = localStorage.getItem("highScore");
    }

    $("#high-score-board").text(highScore);
    board = $("#game")[0];
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();

    $(document).on('keyup', function(e) {
        changeDirection(e);
    });

    setInterval(update, 1000/10);
})



function update() {
    if (gameOver) {
        return;
    }
    $("#score-board").text(currentScore);
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        currentScore++;
        if( highScore < currentScore )
        {
            localStorage.setItem("highScore", currentScore);
            $("#high-score-board").text(currentScore);
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "cyan";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if( snakeX > board.width )
    {
        snakeX = 0;
    } else if( snakeX < 0 ) {
        snakeX = board.width;
    }

    if( snakeY > board.height )
    {
        snakeY = 0;
    } else if( snakeY < 0 ) {
        snakeY = board.height;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            window.location.reload();
        }
    }
}


function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}









