// Define HTML elements

const board = document.getElementById('game-board');
const instructionTxt = document.getElementById('instruction-text')
const logo = document.getElementById('logo')

// Define game Variable
const gridSize = 15; 
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right'
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, snake, food

function draw() {
    board.innerHTML = ' ';
    drawSnake();
    drawFood();
}

// Draw snake

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });

}

// create a snake or food cube/div

function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// set the position of snake or food

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// testing draw function
// draw();

// Draw food function
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);   
    board.appendChild(foodElement)  ;
}


// Generate Food
function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    return {x, y};
}

// moving the snake

function move(){
    const head = {...snake[0]};
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    
        
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y){
        food = generateFood();
        clearInterval(gameInterval); //clear the past interval
        gameInterval = setInterval(()=>{
            move();
            draw();
        }, gameSpeedDelay);
    }
    else {
        
        snake.pop();
    }

}

// Test moving

// setInterval(()=>{
//     move(); // move first
//     draw(); // Then draw again new position
// }, 200);


// Start game function

function startGame() {
    gameStarted = true;
    instructionTxt.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(()=>{
        move();
        // checkCollision();
        draw();
    
    },gameSpeedDelay)
}

// keypress Event listner

function handelKeyPress(event) {
    if ((!gameStarted && event.code === 'space') || (!gameStarted && event.key === ' ')){
        startGame();
    }  else {
        switch (event.key) {
            case "ArrowUp":
                direction = 'up';            
                break;
            case "ArrowDown":
                direction = 'down';            
                break;
            case "ArrowLeft":
                direction = 'left';            
                break;
            case "ArrowRight":
                direction = 'right';            
                break;
        
        
        }
    }
}


document.addEventListener('keydown', handelKeyPress);

function increaseSpeed() {
    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}
