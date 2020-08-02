const cards = document.querySelectorAll(".memory-card");
const score = document.querySelector(".score");
let point = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.style.border = "5px solid limegreen";
  secondCard.style.border = "5px solid limegreen";
  point++;
  score.innerHTML = `${point}!`;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  firstCard.style.border = "5px solid red";
  secondCard.style.border = "5px solid red";
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.style.border = "none";
    secondCard.style.border = "none";
    lockBoard = false;
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
