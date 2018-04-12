// canvas setup
const canvas = document.querySelector('.parallax-starscape');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// watch for browser resizing, reinitialize stars
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


function Star(x, y, width, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.speed = speed;
  this.color = "#fff";
  
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, width, width);
  }

  this.update = () => {
    // check bounds
    if (this.x + this.width > innerWidth) {
      this.x = 0;
    }
    this.x += this.speed;

    this.draw();
  }
}

// Star dimensions and speed
const stars = {
  nearStar : {
    width : 3,
    speed : 0.2
  },
  midStar : {
    width : 2,
    speed : 0.1
  },
  farStar : {
    width : 1,
    speed : 0.025
  }
};

let starArray = [];

// clear starArray and generate 3 layers of stars randomly
function init() {

  starArray = [];
  // nearest stars
  for (let i=0; i < 50; ++i) {
    const x = Math.random() * (innerWidth - stars.nearStar.width);
    const y = Math.random() * (innerHeight - stars.nearStar.width);
    starArray.push(new Star(x, y, stars.nearStar.width, stars.nearStar.speed));
  }

  // mid-distance stars
  for (let i=0; i < 100; ++i) {
    const x = Math.random() * (innerWidth - stars.midStar.width);
    const y = Math.random() * (innerHeight - stars.midStar.width);
    starArray.push(new Star(x, y, stars.midStar.width, stars.midStar.speed));
  }

  // farthest stars
  for (let i=0; i < 350; ++i) {
    const x = Math.random() * (innerWidth - stars.farStar.width);
    const y = Math.random() * (innerHeight - stars.farStar.width);
    starArray.push(new Star(x, y, stars.farStar.width, stars.farStar.speed));
  }
}

// loop to call update function on each star
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var star of starArray) {
    star.update();
  }
}

init();
animate();