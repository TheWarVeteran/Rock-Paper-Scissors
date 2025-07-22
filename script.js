let playerScore = 0;
let computerScore = 0;
let round = 0;
let totalRounds = 5;

const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const roundResult = document.getElementById("round-result");
const finalMessage = document.getElementById("final-message");
const restartBtn = document.getElementById("restart-btn");
const gameArea = document.getElementById("game-area");
const startGameBtn = document.getElementById("start-game-btn");
const roundsInput = document.getElementById("rounds-input");
const bgColorPicker = document.getElementById("bg-color");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

startGameBtn.addEventListener("click", () => {
  totalRounds = parseInt(roundsInput.value);
  if (isNaN(totalRounds) || totalRounds < 1) {
    totalRounds = 5;
  }
  resetGame();
  gameArea.style.display = "block";
});

bgColorPicker.addEventListener("input", (e) => {
  document.body.style.backgroundColor = e.target.value;
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getResult(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  if (result === "win") {
    winSound.play();
    playerScore++;
  } else if (result === "lose") {
    loseSound.play();
    computerScore++;
  } else {
    tieSound.play();
  }

  round++;

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  roundResult.textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}. You ${result}.`;

  if (round >= totalRounds) {
    endGame();
  }
}

function endGame() {
  let message;
  if (playerScore > computerScore) {
    message = "🎉 You won the game!";
  } else if (playerScore < computerScore) {
    message = "💀 You lost the game.";
  } else {
    message = "🤝 It's a tie!";
  }
  finalMessage.textContent = message;
  restartBtn.style.display = "inline-block";
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  roundResult.textContent = "";
  finalMessage.textContent = "";
  restartBtn.style.display = "none";
}

function restartGame() {
  resetGame();
}
