// 1. Define the 4 unique cards (and the file names for your images)
const cardImages = [
    { name: 'confidential', img: 'images/confidential-banner.jpg' },
    { name: 'delorean', img: 'images/delorean-car.jpg' },
    { name: 'office', img: 'images/modern-office.jpg' },
    { name: 'z-logo', img: 'images/simple-z-logo.jpg' },
];
#ZAMA
// 2. Create the full deck (8 cards - 2 of each unique image)
let cards = [...cardImages, ...cardImages];

const gameBoard = document.querySelector('.memory-game');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Function to shuffle the cards (Fisher-Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create the HTML for a single card
function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.dataset.name = card.name;

    cardElement.innerHTML = `
        <img class="front-face" src="${card.img}" alt="${card.name} image">
        <img class="back-face" src="images/card-back.png" alt="Card Back"> 
    `;

    cardElement.addEventListener('click', flipCard);
    return cardElement;
}

// 3. Game Initialization
function initializeGame() {
    shuffle(cards);
    gameBoard.innerHTML = ''; // Clear board
    cards.forEach(card => {
        gameBoard.appendChild(createCard(card));
    });
}

// 4. Game Logic Functions
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Cards match, leave them flipped and disable clicks
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    resetBoard();
}

function unflipCards() {
    lockBoard = true; // Lock board to prevent rapid clicking

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500); // Wait 1.5 seconds before flipping back
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    // Check for win condition (optional, but good practice)
    const matchedCards = document.querySelectorAll('.memory-card.match');
    if (matchedCards.length === cards.length) {
        alert('Congratulations! You won the Zama FHE Memory Game!');
    }
}

window.resetGame = function() {
    initializeGame();
}

// Start the game when the page loads
initializeGame();
