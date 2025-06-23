// Variables to control game state
let gameRunning = false;
let dropMaker;
let gameTimer;
let timeLeft = 30;
let score = 0;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameContainer = document.getElementById("game-container");

const winMessages = [
  "Amazing! You saved so many drops!",
  "You're a hydration hero!",
  "Water wins thanks to you!",
  "You crushed it – water for everyone!",
  "charity: water salutes you!"
];

const loseMessages = [
  "Try again to save more water!",
  "Almost there – give it another shot!",
  "Not bad, but you can do better!",
  "Come back stronger!",
  "Drops slipped through – try again!"
];

document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  gameContainer.innerHTML = ""; // Clear old drops/messages

  dropMaker = setInterval(createDrop, 800);
  gameTimer = setInterval(updateTimer, 1000);
}

function createDrop() {
  const drop = document.createElement("div");
  drop.className = "water-drop";

  const initialSize = 60;
  const size = initialSize * (Math.random() * 0.8 + 0.5);
  drop.style.width = drop.style.height = `${size}px`;

  const gameWidth = gameContainer.offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";
  drop.style.animationDuration = "4s";

  // Add click to score
  drop.addEventListener("click", () => {
    if (!gameRunning) return;
    score++;
    scoreEl.textContent = score;
    drop.remove(); // remove drop after it's caught
  });

  // Remove drop when it reaches the bottom
  drop.addEventListener("animationend", () => {
    drop.remove();
  });

  gameContainer.appendChild(drop);
}

function updateTimer() {
  timeLeft--;
  timeEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  gameRunning = false;
  clearInterval(dropMaker);
  clearInterval(gameTimer);

  // Remove all existing drops
  const drops = document.querySelectorAll(".water-drop");
  drops.forEach(drop => drop.remove());

  // Show random message
  const message = document.createElement("div");
  message.style.fontSize = "24px";
  message.style.fontWeight = "bold";
  message.style.marginTop = "20px";
  message.style.textAlign = "center";
  message.style.color = score >= 20 ? "#159A48" : "#F16061";
  message.textContent = score >= 20
    ? winMessages[Math.floor(Math.random() * winMessages.length)]
    : loseMessages[Math.floor(Math.random() * loseMessages.length)];

  gameContainer.appendChild(message);
}
