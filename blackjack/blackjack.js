const messageEl = document.querySelector("#message-el");
const cardsEl = document.querySelector("#cards-el");
const sumEl = document.querySelector("#sum-el");
const playerEl = document.getElementById("player-el");

const startBtn = document.getElementById("start-btn");

let cards = [];
let sum = 0;
// we use this variable to invoke newCard() such that it works only when isAlive is true
// else, even before starting the game we can click on new card
let isAlive = false;

// object
let playerInfo = {
  name: "Akshay",
  chips: 400,
};

// startGame() function
startBtn.addEventListener("click", function () {
  cards = [getRandomNum(), getRandomNum()];
  isAlive = true;
  // card1
  // cards.push(getRandomNum());

  // card2
  // cards.push(getRandomNum());

  renderGame();
});

function renderGame() {
  cardsEl.textContent = "Cards: ";
  // sumEl.textContent = "Sum: ";
  sum = 0;

  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
    sum += cards[i];
  }

  sumEl.textContent = "Sum: " + sum;

  if (sum < 21) {
    messageEl.textContent = "Do you want to draw a new card?";
  } else if (sum === 21) {
    messageEl.textContent = "You've got Blackjack!";
    isAlive = false;
  } else {
    messageEl.textContent = "You're out of the game!";
    isAlive = false;
  }
}

function newCard() {
  // we do this check to ensure game is started i.e. NEW CARD btn is clicked afetr clicking START GAME btn
  if (isAlive) {
    cards.push(getRandomNum());
    renderGame();
  }
}

function getRandomNum() {
  // this will give 13 and not 14
  // !here there is a chance of getting 0 and 0 *13 will be 0, and ceil of 0 is 0. But we never get 0 in UI?
  // Yes the above issues exists and though the probability of getting 0 is less as per stackoverflow, it can happen
  // so, better to use Math.floor(....) + 1
  return Math.ceil(Math.random() * 13);
}

playerEl.textContent = playerInfo.name + ": $" + playerInfo.chips;
