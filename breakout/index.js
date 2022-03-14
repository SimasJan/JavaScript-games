// taken from styles.css
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

// params
const boardWidth = 560
const boardHeight = 300
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
// changing vars
let timerId
let xDirection = 2
let yDirection = 2

// starting positions
const userStartPosition = [230, 10] // 230x 10y
let userCurrentPosition = userStartPosition

const ballStartPosition = [230, 40]
let ballCurrentPosition = ballStartPosition


// create a block class (individual)
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis] // default position
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// add blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px' // get an xAxis from `Block[0].bottomLeft.[xAxis]`
        block.style.bottom = blocks[i].bottomLeft[1] + 'px' // get an yAxis
        grid.appendChild(block)   
    }
    console.log(blocks)
}

addBlocks()

// add user at bottom middle of the pannel
const user = document.createElement('div')
user.classList.add('user')
drawUser() // call function to update user current position
grid.appendChild(user)
console.log(user)

// draw the user
function drawUser() {
    user.style.left = userCurrentPosition[0] + 'px'
    user.style.bottom = userCurrentPosition[1] + 'px'
}

// draw a ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'    
}

// move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (userCurrentPosition[0] > 0) { // check params
                userCurrentPosition[0] -= 10  // move xAxis position and draw new user
                drawUser()    
            }
            break;
            case 'ArrowRight':
                if (userCurrentPosition[0] < boardWidth - blockWidth) {
                    userCurrentPosition[0] += 10
                    drawUser()
                }
                break;
    }
}
// listen to user input events
document.addEventListener('keydown', moveUser)

// add a ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move the ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions() // after drawing the ball check for collision
}

// callback to moveBall function every 30ms
timerId = setInterval(moveBall, 30) 

// check for ball collisions
function checkForCollisions() {
    // check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeBallDirection()  
    }
    
    // check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lost!'
        document.removeEventListener('keydown', moveUser) // remove the listening event of key
    }
}

// change ball direction
function changeBallDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2 
        return
    }
    if (xDirection == -2 && yDirection == -1) {
        xDirection = -2 
        return
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2
        return
    }
    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2
        return
    }
}