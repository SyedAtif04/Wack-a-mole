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

window.onload = function () {
  setGame();
};

function setGame() {
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

  catInterval = setInterval(setCats, 1000);
  duckInterval = setInterval(setDucks, 2000);
  timerInterval = setInterval(updateTimer, 1000);
  positionSwapInterval = setInterval(swapPositions, 1500);

  setInterval(() => {
    if (!gameOver && numCats < 3) numCats++;
    if (!gameOver && numDucks < 3) numDucks++;
  }, 10000);
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

document.getElementById("restartButton").addEventListener("click", restartGame);
