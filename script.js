let playerScore = 0;
let computerScore = 0;
const maxRounds = 5;
let roundsPlayed = 0;

const resultDiv = document.getElementById("result");
const finalResultDiv = document.getElementById("final-result");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

function play(playerChoice) {
  if (roundsPlayed >= maxRounds) return;

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const outcome = getResult(playerChoice, computerChoice);
  roundsPlayed++;

  if (outcome === "win") {
    playerScore++;
    resultDiv.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
    winSound.play();
  } else if (outcome === "lose") {
    computerScore++;
    resultDiv.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
    loseSound.play();
  } else {
    resultDiv.textContent = `It's a Tie! You both chose ${playerChoice}`;
    tieSound.play();
  }

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;

  if (roundsPlayed === maxRounds) {
    declareWinner();
  }
}

function getResult(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "win";
  }
  return "lose";
}

function declareWinner() {
  if (playerScore > computerScore) {
    finalResultDiv.textContent = "🎉 You are the overall winner!";
  } else if (computerScore > playerScore) {
    finalResultDiv.textContent = "😢 Computer wins overall!";
  } else {
    finalResultDiv.textContent = "🤝 It's a draw overall!";
  }
}
