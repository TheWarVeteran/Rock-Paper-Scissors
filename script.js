let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let totalRounds = 5;
let wins = 0, losses = 0, ties = 0;

// Sound elements
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');

const resultEl = document.getElementById("result");
const finalResultEl = document.getElementById("final-result");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");

const ctx = document.getElementById('scoreChart').getContext('2d');
const scoreChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Wins', 'Losses', 'Ties'],
    datasets: [{
      label: 'Game Stats',
      data: [wins, losses, ties],
      backgroundColor: ['#06d6a0', '#ef476f', '#ffd166']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

function updateChart() {
  scoreChart.data.datasets[0].data = [wins, losses, ties];
  scoreChart.update();
}

function playRound(playerChoice) {
  if (roundsPlayed >= totalRounds) return;

  const computerChoice = getComputerChoice();
  let result = "";

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
    ties++;
    tieSound.play();
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = "You win!";
    playerScore++;
    wins++;
    winSound.play();
  } else {
    result = "You lose!";
    computerScore++;
    losses++;
    loseSound.play();
  }

  roundsPlayed++;
  resultEl.textContent = result;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  updateChart();

  if (roundsPlayed === totalRounds) {
    if (playerScore > computerScore) {
      finalResultEl.textContent = "🎉 You are the overall winner!";
    } else if (playerScore < computerScore) {
      finalResultEl.textContent = "💻 The computer wins overall!";
    } else {
      finalResultEl.textContent = "😐 It's an overall tie!";
    }
  }
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("change", function() {
  document.body.classList.toggle("dark", this.checked);
});
