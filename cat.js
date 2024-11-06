// Adding a starting page, updating game logic, and improving visuals
window.onload = function () {
  showStartPage();
};

function showStartPage() {
  const body = document.body;
  body.innerHTML = `
    <div class="start-page">
      <h1>Welcome to Wack A Cat!</h1>
      <p>Rules: Click on the cats to score points. Avoid clicking on the ducks. You have 60 seconds to score as high as you can. If you click a duck, the game ends!</p>
      <button id="startButton" class="game-button">Start Game</button>
    </div>
  `;
  document.getElementById("startButton").addEventListener("click", setGame);
}

let currCatTiles = [];
let currDuckTiles = [];
let score = 0;
let gameOver = false;
let numCats = 1;
let numDucks = 1;
let timer;
let timeLeft = 60;

let catInterval;
let duckInterval;
let timerInterval;
let positionSwapInterval;

function setGame() {
  gameOver = false;
  document.body.innerHTML = `
    <h1>Wack A Cat</h1>
    <div class="controls">
      <h3>Score: <span id="score">0</span></h3>
      <h3>Time Left: <span id="timer">60</span></h3>
    </div>
    <div class="game-container">
      <div id="board"></div>
      <button id="restartButton" class="game-button" style="display: none;">Restart Game</button>
    </div>
  `;

  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.className = "tile";
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }

  clearInterval(catInterval);
  clearInterval(duckInterval);
  clearInterval(timerInterval);
  clearInterval(positionSwapInterval);

  catInterval = setInterval(setCats, 1350);
  duckInterval = setInterval(setDucks, 1500);
  timerInterval = setInterval(updateTimer, 1000);
  positionSwapInterval = setInterval(swapPositions, 1500);

  setInterval(() => {
    if (!gameOver && numCats < 3) numCats++;
    if (!gameOver && numDucks < 3) numDucks++;
  }, 20000);

  setRestartButtonListener();
}

function getRandomTile(excludeTiles = []) {
  let num;
  do {
    num = Math.floor(Math.random() * 9).toString();
  } while (excludeTiles.includes(num));
  return num;
}

function setCats() {
  if (gameOver) return;

  currCatTiles.forEach((tile) => (tile.innerHTML = ""));
  currCatTiles = [];

  for (let i = 0; i < numCats; i++) {
    let cat = document.createElement("img");
    cat.src = "./cat.png";
    cat.addEventListener("click", () => {
      if (!cat.dataset.clicked) {
        cat.src = "./cat-whacked.png"; // Change to an image representing the cat being whacked
        cat.dataset.clicked = true;
        cat.removeEventListener("click", arguments.callee); // Prevent further clicks
        setTimeout(() => {
          cat.parentElement.innerHTML = "";
        }, 200);
      }
    });

    let num = getRandomTile([
      ...currCatTiles.map((t) => t.id),
      ...currDuckTiles.map((t) => t.id),
    ]);
    let catTile = document.getElementById(num);
    catTile.appendChild(cat);
    currCatTiles.push(catTile);
  }
}

function setDucks() {
  if (gameOver) return;

  currDuckTiles.forEach((tile) => (tile.innerHTML = ""));
  currDuckTiles = [];

  for (let i = 0; i < numDucks; i++) {
    let duck = document.createElement("img");
    duck.src = "./duck.png";

    let num = getRandomTile([
      ...currCatTiles.map((t) => t.id),
      ...currDuckTiles.map((t) => t.id),
    ]);
    let duckTile = document.getElementById(num);
    duckTile.appendChild(duck);
    currDuckTiles.push(duckTile);
  }
}

function swapPositions() {
  if (gameOver) return;

  if (currCatTiles.length > 0 && currDuckTiles.length > 0) {
    let catIndex = Math.floor(Math.random() * currCatTiles.length);
    let duckIndex = Math.floor(Math.random() * currDuckTiles.length);

    let catTile = currCatTiles[catIndex];
    let duckTile = currDuckTiles[duckIndex];

    let tempCat = catTile.innerHTML;
    catTile.innerHTML = duckTile.innerHTML;
    duckTile.innerHTML = tempCat;

    currCatTiles[catIndex] = duckTile;
    currDuckTiles[duckIndex] = catTile;
  }
}

function selectTile() {
  if (gameOver) return;

  if (currCatTiles.includes(this)) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  } else if (currDuckTiles.includes(this)) {
    endGame();
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    document.getElementById("timer").innerText = ": " + timeLeft;
  } else {
    endGame();
  }
}

function endGame() {
  gameOver = true;
  clearInterval(catInterval);
  clearInterval(duckInterval);
  clearInterval(timerInterval);
  clearInterval(positionSwapInterval);
  document.getElementById("score").innerText = "GAME OVER: " + score.toString();
  document.getElementById("restartButton").style.display = "block";
}

function restartGame() {
  currCatTiles = [];
  currDuckTiles = [];
  score = 0;
  timeLeft = 60;
  gameOver = false;
  numCats = 1;
  numDucks = 1;
  document.getElementById("score").innerText = score.toString();
  document.getElementById("timer").innerText = ": " + timeLeft;
  document.getElementById("restartButton").style.display = "none";
  document.getElementById("board").innerHTML = "";
  setGame();
}

function setRestartButtonListener() {
  document
    .getElementById("restartButton")
    .addEventListener("click", restartGame);
}

setRestartButtonListener();
//final
