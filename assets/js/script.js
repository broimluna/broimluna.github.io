function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', function () {
    const element = document.getElementsByTagName('loading')[0];
    sleep(4100).then(() => {
        element.style.transform = 'scale(1.10)';
        element.style.transform = 'scale(1)';
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease';
        // Hide element completely after fade
        setTimeout(() => {
            element.style.display = 'none';
        }, 500); // Matches fade duration
    });
});

window.addEventListener('load', function () {
const container = document.querySelector('.bubbles');
const bubbleCount = 65;
const bubbles = [];

// initialize bubbles once
for (let i = 0; i < bubbleCount; i++) {
  const b = document.createElement('span');
  b.classList.add('bubble');
  container.appendChild(b);
  bubbles.push(b);
  startBubble(b);
}

function startBubble(b) {
  randomize(b);
  runAnimation(b);

  b.addEventListener('animationend', () => {
    b.style.opacity = '0';
    const wait = 1000 + Math.random() * 4000; // 1–5s cooldown
    setTimeout(() => {
      randomize(b);
      runAnimation(b);
    }, wait);
  });
}

function runAnimation(b) {
  b.style.animation = 'none';
  void b.offsetWidth; // force reflow
  b.style.animation = `floatUp linear ${b.dataset.duration}s forwards`;
}

function randomize(b) {
  const size = 20 + Math.random() * 80; // px
  const left = Math.random() * 100;     // %
  const duration = 8 + Math.random() * 12; // s
  const delay = Math.random() * 5;      // s

  b.style.width = `${size}px`;
  b.style.height = `${size}px`;
  b.style.left = `${left}%`;
  b.style.animationDelay = `${delay}s`;
  b.dataset.duration = duration;
}
});


function startTime() {
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    
    var timehtml = document.getElementById("sidetime");
    if (timehtml) {
        timehtml.innerHTML = hour + ":" + min + ":" + sec;
    }
}

// Update time every second

setInterval(startTime, 1000);

function togglecontainer() {
    document.getElementsByTagName("container")[0].classList.toggle("hidden")
}
