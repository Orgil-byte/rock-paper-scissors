const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const buttons = document.getElementById("buttons");
const buttonForRes = document.getElementById("buttonForRes");
const robotHand = document.getElementById("robotHand");
const playerHand = document.getElementById("playerHand");
const restartBtn = document.getElementById("restartBtn");
const nextRoundBtn = document.getElementById("nextRound");

let playerScore = 0;
let computerScore = 0;
let isAnimating = false;

// Put both hands back into their default "shaking" state
function resetHandsToIdle() {
  robotHand.style.backgroundImage = 'url("./AI-hand.png")';
  playerHand.style.backgroundImage = 'url("./PLAYER-hand.png")';

  robotHand.classList.remove("shake-wide");
  playerHand.classList.remove("shake-wide");

  // Re‑enable the gentle shake animation
  if (!robotHand.classList.contains("shake")) {
    robotHand.classList.add("shake");
  }
  if (!playerHand.classList.contains("shake")) {
    playerHand.classList.add("shake");
  }
}

// Initial setup
window.addEventListener("load", () => {
  resetHandsToIdle();

  restartBtn.addEventListener("click", handleRestart);
  nextRoundBtn.addEventListener("click", handleNextRound);
});

function playGame(playerChoice) {
  // Prevent spamming the buttons while a round is running
  if (isAnimating) return;
  isAnimating = true;

  // Hide choice buttons while the round plays
  buttons.style.display = "none";
  buttonForRes.style.display = "none";
  resultDisplay.textContent = "";

  const computerChoice = choices[Math.floor(Math.random() * 3)];

  // Switch from gentle shake to wider shake animation
  robotHand.classList.remove("shake");
  playerHand.classList.remove("shake");

  // Force reflow so animation restarts consistently
  void robotHand.offsetWidth;
  void playerHand.offsetWidth;

  robotHand.classList.add("shake-wide");
  playerHand.classList.add("shake-wide");

  setTimeout(() => {
    // End the wide shake animation
    robotHand.classList.remove("shake-wide");
    playerHand.classList.remove("shake-wide");

    // Show the chosen images for this round
    robotHand.style.backgroundImage = `url("./${computerChoice}.png")`;
    playerHand.style.backgroundImage = `url("./${playerChoice}.png")`;

    // Work out round result
    let result = "";
    if (playerChoice === computerChoice) {
      result = "IT'S A DRAW";
    } else if (playerChoice === "rock") {
      result = computerChoice === "scissors" ? "YOU WON!" : "YOU LOST!";
    } else if (playerChoice === "paper") {
      result = computerChoice === "rock" ? "YOU WON!" : "YOU LOST!";
    } else if (playerChoice === "scissors") {
      result = computerChoice === "paper" ? "YOU WON!" : "YOU LOST!";
    }

    computerDisplay.textContent = "AI";
    playerDisplay.textContent = "YOU";

    if (result === "YOU WON!") {
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
    } else if (result === "YOU LOST!") {
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
    }

    resultDisplay.textContent = result;

    // Show result controls (Next round / Restart)
    buttonForRes.style.display = "flex";

    isAnimating = false;
  }, 2500);
}

function handleNextRound() {
  resultDisplay.textContent = "";
  buttonForRes.style.display = "none";
  resetHandsToIdle();
  buttons.style.display = "flex";
}

function handleRestart() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = "0";
  computerScoreDisplay.textContent = "0";

  handleNextRound();
}
