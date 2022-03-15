// TODO: 
// [1] Add total time played calculation
// [2] Tik-Tok-Toe game of using only burgers v pizza

// card options
const cardArray = [
    // defining objects and image sources
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    // duplicating for the game, needs 12
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    }
]

// sorts an array randomly by comparing 2 values
cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('#grid') // looks for `div.grid`
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
// start and end time of the play (since first click)
const startTime = 0
const endTime = 0


function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i) // setting, not getting.
        card.addEventListener('click', flipCard) // call it only when clicked on it!
        try {
            grid.appendChild(card)
            // console.log('Logged card ' + card + ' with id ' + i)
        } catch (error) {
            console.log('Error card ' + card + ' with id ' + i)
        }
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('#grid img') // look for all the img inside grid id.
    let optionOneId = cardsChosenIds[0]
    let optionTwoId = cardsChosenIds[1]
    console.log('Check for a match. Pair1 ' + optionOneId + ' ' + optionTwoId)
    console.log(cards)
    if (optionOneId == optionTwoId) {
        alert('You have clicked the same image!')
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found a match!') // TODO: change to a pop-up
        cards[optionTwoId].setAttribute('src', 'images/white.png') // change found img to white
        cards[optionOneId].setAttribute('src', 'images/white.png') // change found img to white
        
        cards[optionOneId].removeEventListener('click', flipCard) // stop listening to clicks on card
        cards[optionTwoId].removeEventListener('click', flipCard) // stop listening to clicks on card
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('Sorry try again!')
    }

    resultDisplay.textContent = cardsWon.length 
    // reset
    cardsChosen = []  
    cardsChosenIds = []

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.innerHTML = 'Congratulations! You found them all!'
    }
}

// change on click to another card
function flipCard() {
    const d = new Date()
    console.log(d)
    const cardId = this.getAttribute('data-id') // whatever element we clicked get its attr
    cardsChosen.push(cardArray[cardId].name) // add an item name to array
    cardsChosenIds.push(cardId) // saving card id 
    console.log(cardsChosen)

    this.setAttribute('src', cardArray[cardId].img) // capture img by cardId 
    
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500)
    }
}