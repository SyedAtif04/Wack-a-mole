
let currCatTile;
let currDuckTile;
let score = 0;
let gameOver = false;
// let timeLeft = 30;


window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile)
    }

    setInterval(setCat, 1000);
    setInterval(setDuck, 2000);
    startTimer();
}

// function startTimer() {
//     let timerInterval = setInterval(() => {
//         if (timeLeft > 0) {
//             document.getElementById("timer").innerText = "Time Left: " + timeLeft;
//             timeLeft--; // Decrease timeLeft by 1
//         } else {
//             clearInterval(timerInterval); // Stop the timer when it reaches 0
//             endGame();
//         }
//     }, 1000); // Timer runs every 1000ms (1 second)
// }


function getRandomTile() {

    let num = Math.floor(Math.random() * 9);
    return num.toString();

}

function setCat() {

    if (gameOver) {
        return;
    }

    if (currCatTile) {
        currCatTile.innerHTML = "";
    }



    let cat = document.createElement("img");
    cat.src = "./cat.png";

    let num = getRandomTile()
    if (currDuckTile && currDuckTile.id == num) {
        return;
    }
    currCatTile = document.getElementById(num);
    currCatTile.appendChild(cat);
}

function setDuck() {

    if (gameOver) {
        return;
    }

    if (currDuckTile) {
        currDuckTile.innerHTML = "";
    }

    let duck = document.createElement("img")
    duck.src = "./duck.png";

    let num = getRandomTile();
    if (currCatTile && currCatTile.id == num) {
        return;
    }
    currDuckTile = document.getElementById(num);
    currDuckTile.appendChild(duck);

}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currCatTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currDuckTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}



