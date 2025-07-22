let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

const roundResultText = document.getElementById("round-result");
const finalMessage = document.getElementById("final-message");
const playerScoreText = document.getElementById("player-score");
const computerScoreText = document.getElementById("computer-score");
const roundNumberText = document.getElementById("round-number");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

const chartCtx = document.getElementById("result-chart").getContext("2d");
const roundHistory = [];

let chart = new Chart(chartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Player Score',
        data: [],
        borderColor: '#4CAF50',
        fill: false
      },
      {
        label: 'Computer Score',
        data: [],
        borderColor: '#F44336',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function play(playerChoice) {
  if (round > maxRounds) return;

  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let resultText = "";

  if (playerChoice === computerChoice) {
    resultText = `It's a tie! Both chose ${playerChoice}.`;
    tieSound.play();
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    playerScore++;
    resultText = `You win! ${playerChoice} beats ${computerChoice}.`;
    winSound.play();
  } else {
    computerScore++;
    resultText = `You lose! ${computerChoice} beats ${playerChoice}.`;
    loseSound.play();
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  roundNumberText.textContent = round;
  roundResultText.textContent = resultText;

  updateChart(round, playerScore, computerScore);
  round++;

  if (round > maxRounds) {
    endGame();
  }
}

function updateChart(roundNumber, player, computer) {
  chart.data.labels.push(`Round ${roundNumber}`);
  chart.data.datasets[0].data.push(player);
  chart.data.datasets[1].data.push(computer);
  chart.update();
}

function endGame() {
  if (playerScore > computerScore) {
    finalMessage.textContent = "🎉 You are the overall winner!";
  } else if (playerScore < computerScore) {
    finalMessage.textContent = "💻 Computer wins the game!";
  } else {
    finalMessage.textContent = "🤝 It's a draw!";
  }
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  playerScoreText.textContent = 0;
  computerScoreText.textContent = 0;
  roundNumberText.textContent = 1;
  roundResultText.textContent = "Make your move!";
  finalMessage.textContent = "";

  chart.data.labels = [];
  chart.data.datasets.forEach(ds => ds.data = []);
  chart.update();
}
