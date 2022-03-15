const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice //  define globally
let computerChoice
let result 

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
	userChoice = e.target.id
	userChoiceDisplay.innerHTML = userChoice
	generateComputerChoice()
	getResult()
}))

function generateComputerChoice() {
	const randomNumber = Math.floor(Math.random() * possibleChoices.length)+1 // using possible choices length
	// console.log('randomNumber:' + randomNumber)

	if (randomNumber === 1 ) {
		computerChoice = 'rock'
	}
	if (randomNumber === 2) {
		computerChoice = 'scissors'
	}
	if (randomNumber === 3) {
		computerChoice = 'paper'
	}
	// console.log('ComputerChoice:' + computerChoice)
	computerChoiceDisplay.innerHTML = computerChoice
}
// 1 > 2 > 3 & 3 > 1

function getResult() {
	if (computerChoice === userChoice) {
		result = "It's a draw!"
	}
	if (computerChoice === 'rock' && userChoice === 'paper') {
		result = "You Win!"
	}
	if (computerChoice === 'rock' && userChoice === 'scissors') {
		result = "You Lost!"
	}
	if (computerChoice === 'paper' && userChoice === 'scissors') {
		result = "You Win!"
	}
	if (computerChoice === 'scissors' && userChoice === 'rock') {
		result = "You Win!"
	}
	if (computerChoice === 'scissors' && userChoice === 'paper') {
		result = "You Lost!"
	}
	console.log(result)
	resultDisplay.innerHTML = result
}