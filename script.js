let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let roundCount = 0;
let maxRounds = 5;

const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const tieScoreSpan = document.getElementById("tie-score");
const resultDiv = document.getElementById("result");
const finalResultDiv = document.getElementById("final-result");
const roundsSelect = document.getElementById("rounds");
const themeToggle = document.getElementById("theme-toggle");
const playerChoiceImg = document.getElementById("player-choice-img");
const computerChoiceImg = document.getElementById("computer-choice-img");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

const scoreChartCtx = document.getElementById("scoreChart").getContext("2d");
let scoreChart = new Chart(scoreChartCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Player",
        data: [],
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Computer",
        data: [],
        borderColor: "#F44336",
        fill: false,
      },
      {
        label: "Ties",
        data: [],
        borderColor: "#2196F3",
        fill: false,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Score Progression" }
    }
  }
});

roundsSelect.addEventListener("change", () => {
  maxRounds = parseInt(roundsSelect.value);
  resetGame();
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function updateChoiceImages(playerChoice, computerChoice) {
  playerChoiceImg.src = `assets/${playerChoice}.png`;
  computerChoiceImg.src = `assets/${computerChoice}.png`;
}

function playRound(playerChoice) {
  if (roundCount >= maxRounds) return;

  const computerChoice = getComputerChoice();
  let result = "";

  updateChoiceImages(playerChoice, computerChoice);

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
    tieScore++;
    tieSound.play();
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    playerScore++;
    result = `You win! ${playerChoice} beats ${computerChoice}`;
    winSound.play();
  } else {
    computerScore++;
    result = `You lose! ${computerChoice} beats ${playerChoice}`;
    loseSound.play();
  }

  roundCount++;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  tieScoreSpan.textContent = tieScore;
  resultDiv.textContent = result;

  scoreChart.data.labels.push(`R${roundCount}`);
  scoreChart.data.datasets[0].data.push(playerScore);
  scoreChart.data.datasets[1].data.push(computerScore);
  scoreChart.data.datasets[2].data.push(tieScore);
  scoreChart.update();

  if (roundCount === maxRounds) {
    declareFinalResult();
  }
}

function declareFinalResult() {
  if (playerScore > computerScore) {
    finalResultDiv.textContent = "🎉 You are the overall winner!";
  } else if (playerScore < computerScore) {
    finalResultDiv.textContent = "😞 Computer wins the game.";
  } else {
    finalResultDiv.textContent = "🤝 It's a tie overall.";
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  roundCount = 0;
  finalResultDiv.textContent = "";
  resultDiv.textContent = "";
  playerScoreSpan.textContent = "0";
  computerScoreSpan.textContent = "0";
  tieScoreSpan.textContent = "0";
  playerChoiceImg.src = "assets/placeholder.png";
  computerChoiceImg.src = "assets/placeholder.png";
  scoreChart.data.labels = [];
  scoreChart.data.datasets[0].data = [];
  scoreChart.data.datasets[1].data = [];
  scoreChart.data.datasets[2].data = [];
  scoreChart.update();
}
