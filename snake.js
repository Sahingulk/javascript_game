/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let initialState = {
  clos: 30,
  rows: 20,
  score: 0,
  tail: [],
  sX: 0,
  sY: 0,
  xEat: null,
  yEat: null,
  velX: 0,
  velY: 0,
  gameover: false,
};
var over = new Audio();
var sc = new Audio();

over.src ="sounds/over.mp3"
sc.src = "sounds/sc.mp3";

canvas.width = 20 * 30;
canvas.height = 20 * 20;

class Square {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Text {
  constructor(text, x, y, textAlign, fontsize) {
    this.text = text;
    this.y = y;
    this.x = x;
    this.textAlign = textAlign;
    this.fontsize = fontsize;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.font = `${this.fontsize}px Roboto `;
    ctx.textAlign = this.textAlign;
    ctx.fillText(this.text, this.x, this.y);
  }
}
let artir = 100;
let k = 0;

document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.key == "ArrowLeft") {
    initialState.velX = -1;
    initialState.velY = 0;
  } else if (event.key == "ArrowUp") {
    initialState.velX = 0;
    initialState.velY = -1;
  } else if (event.key == "ArrowRight") {
    initialState.velX = 1;
    initialState.velY = 0;
  } else if (event.key == "ArrowDown") {
    initialState.velX = 0;
    initialState.velY = 1;
  }
  this.documentElement.getElementById('score').innerText =initialState.score
});

const generateEaat = () => {
  initialState.xEat = Math.floor(Math.random() * 30) * 20;
  initialState.yEat = Math.floor(Math.random() * 20) * 20;
  k++;
    sc.play();
};

generateEaat();

const loop = () => {
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    new Square(0, 0, canvas.width, canvas.height, "Black").draw();
    new Square(initialState.sX, initialState.sY, 20, 20, "blue").draw();
    new Square(initialState.xEat, initialState.yEat, 20, 20, "green").draw();

    initialState.sX += initialState.velX * 20;
    initialState.sY += initialState.velY * 20;

    if (
      initialState.sX == initialState.xEat &&
      initialState.sY == initialState.yEat
    ) {
      initialState.tail.push([initialState.xEat, initialState.yEat]);
      initialState.score += 1;
      generateEaat();
    }

    for (let i = initialState.tail.length - 1; i >= 1; i--) {
      initialState.tail[i] = initialState.tail[i - 1];
    }

    if (initialState.tail.length) {
      initialState.tail[0] = [initialState.sX, initialState.sY];
    }

    for (let i = 0; i < initialState.tail.length; i++) {
      new Square(
        initialState.tail[i][0],
        initialState.tail[i][1],
        20,
        20,
        "blue"
      ).draw();
    }

    if (
      initialState.sX < 0 ||
      initialState.sX > canvas.width ||
      initialState.sY < 0 ||
      initialState.sY > canvas.height
    ) {
      gameOver();
    }

    if(initialState.gameover){
        new Text('Oyun bitti',canvas.width/2, canvas.height/2-25, 'center', 50).draw();
        new Text('Ekrana tıkla ve yeniden basla',canvas.width/2, canvas.height/2+25, 'center', 20).draw();
        
    }
  }, 1300 / 10);
};

const gameOver = () => {
    over.play(),
  (initialState.score = 0),
    (initialState.tail = []),
    (initialState.sX = 0),
    (initialState.sY = 0),
    (initialState.velX = 0),
    (initialState.velY = 0),
    (initialState.gameover = true);
};

addEventListener("click", () => {
  initialState.gameover = false;
});

loop();
