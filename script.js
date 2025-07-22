@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  transition: background-color 0.3s ease;
}

.round-selector {
  padding: 20px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

h1 {
  font-size: 2.5em;
  margin-top: 30px;
  color: #333;
}

.scoreboard {
  margin-top: 20px;
  font-size: 1.2em;
}

.choices button {
  padding: 15px 30px;
  margin: 10px;
  font-size: 1em;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: #4CAF50;
  color: white;
}

.choices button:hover {
  transform: scale(1.05);
  background-color: #45a049;
}

#round-result,
#final-message {
  margin-top: 20px;
  font-weight: bold;
}

#restart-btn {
  margin-top: 20px;
  padding: 10px 25px;
  font-size: 1em;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

#restart-btn:hover {
  background-color: #1976D2;
}

input[type="color"] {
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
}

canvas#scoreChart {
  max-width: 600px;
  margin: 40px auto;
  display: block;
}
