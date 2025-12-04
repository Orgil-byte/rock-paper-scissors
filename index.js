const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const buttons = document.getElementById("buttons");
const buttonForRes = document.getElementById("buttonForRes");

let playerScore = 0;
let computerScore = 0;

function refreshBtn() {
  const restart = document.getElementById("restartBtn");
  restart.onclick = function () {
    location.reload();
  };
}

function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = "";
  if (playerChoice === computerChoice) {
    result = "IT'S A DRAW";
  } else {
    if (playerChoice === "rock") {
      result = computerChoice === "scissors" ? "YOU WON!" : "YOU LOST!";
    } else if (playerChoice === "paper") {
      result = computerChoice === "rock" ? "YOU WON!" : "YOU LOST!";
    } else if (playerChoice === "scissors") {
      result = computerChoice === "paper" ? "YOU WON!" : "YOU LOST!";
    }
  }
  computerDisplay.textContent = `AI ${computerChoice}`;

  if (result === "YOU WON!") {
    playerScore++;
    resultDisplay.textContent = result;
    playerScoreDisplay.textContent = playerScore;
  } else if (result === "YOU LOST!") {
    computerScore++;
    resultDisplay.textContent = result;
    computerScoreDisplay.textContent = computerScore;
  } else if (result === "IT'S A DRAW") {
    resultDisplay.textContent = result;
  }
  if (playerScore === 3 || computerScore === 3) {
    buttons.style.display = `none`;
    buttonForRes.style.display = `block`;
    return;
  }
  refreshBtn();
}
