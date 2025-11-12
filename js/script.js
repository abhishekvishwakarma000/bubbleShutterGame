var Score = 0;
var timer = 60;
var hit = 0;
var timing;
var timerStarted = false;

const clickSound = new Audio();
clickSound.src = "music/click.wav";

const gameOverSound = new Audio();
gameOverSound.src = "/music/gameover.wav";

const wrongclick = new Audio();
wrongclick.src = "music/ohno.mp3";

function bubble() {
  var clutter = "";

  // Get the width and height of the screen/container
  const container = document.querySelector(".bottom");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Estimate how many boxes can fit
  const boxSize = 35; // assuming each box is 50px by 50px
  const cols = Math.floor(containerWidth / boxSize);
  const rows = Math.floor(containerHeight / boxSize);
  const totalBoxes = cols * rows;

  for (var i = 0; i < totalBoxes; i++) {
    var rn = Math.floor(Math.random() * 10);
    clutter += `<div class="box">${rn}</div>`;
  }

  container.innerHTML = clutter;
}

function hitrun() {
  hit = Math.floor(Math.random() * 10);
  document.querySelector("#hit").textContent = hit;
}

function scores() {
  Score += 10;
  document.querySelector("#score").textContent = Score;
}
function time() {
  let timing = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#timer").textContent = timer;
    } else {
      clearInterval(timing);
      gameOverSound.play();
      document.querySelector(".bottom").innerHTML = `<div class="over">
      <h3>GAME OVER</h3>
        <div class="newgame">
            <a href="index.html">New Game</a></div>      
      </div>`;
    }
  }, 1000);
}

// function trigger(){
//    let bottom = document.querySelector(".bottom");
//     bottom.addEventListener("click", function(e){
//       let target = (Number(e.target.textContent));
//       if(hit===target){
//         scores();
//         hitrun();
//         bubble();

//       }

//     })
// }
function trigger() {
  let bottom = document.querySelector(".bottom");
  bottom.addEventListener("click", function (e) {
    if (!timerStarted) {
      time();
      timerStarted = true;
    }
    let box = e.target.closest(".box");
    if (box) {
      let target = Number(box.textContent);
      if (hit === target) {
        clickSound.play();
        scores();
        hitrun();
        bubble();
      } else {
        wrongclick.play();
        box.style.backgroundColor = "red";
        setTimeout(() => {
          box.style.backgroundColor = "";
        }, 500);
      }
    }
  });
}
bubble();
hitrun();
// time();
trigger();
