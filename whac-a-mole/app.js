// constant variables
const squares = document.querySelectorAll('.square') // look for anything with class name 
const mole = document.querySelector('.mole') // search for the mole class
const timeLeft = document.querySelector('#time-left') // collect time-left id element
const score = document.querySelector('#score')

// changing variables
let currentTime = 30 // game duration in seconds
let result = 0 // start with result = 0
let hitPosition 

function randomSquare() {
	// put a mole into a random square
	squares.forEach(square => {
		// remove mole if it exists in any of the squares
		square.classList.remove('mole') 
	})

	// put a mole into another random square (0-8)
	let randomSquare = squares[Math.floor(Math.random() * 9)] 	// select a randomSquare
	randomSquare.classList.add('mole') 							// add mole to a random square
	hitPosition = randomSquare.id 								// make square id a hitPosition to score
}

// grab the squares: for each square in our squares array, add an event listener
// to listen out if we put the mouse down (clicked on the square)
// if square.id = hitPosition increment the result value by 1, 
// update the score value and reset hitPosition to null
squares.forEach(square => {
	square.addEventListener('mousedown', () => {
		if (square.id == hitPosition) {
			result++
			console.log(result)
			score.textContent = 'Your score: ' + result // show the result in the score element
			hitPosition = null
		}
	})
})

function moveMole() {
	// move a mole to a random square at every N interval
	let N = 500
	let timerId = null
	timerId = setInterval(randomSquare, N) // set a random square every 500ms
}

function countDown() {
	currentTime-- // decrement by 1
	timeLeft.textContent = 'Timeleft: ' + currentTime

	if (currentTime == 0) {
		clearInterval(countDownTimerId) // clear the value
		alert('GAME OVER!\nYour final score is ' + result)
	}

}

moveMole() // call the function
let countDownTimerId = setInterval(countDown, 500) // Every 500ms get the countdown
