function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', function () {
    const element = document.getElementsByTagName('loading')[0];
    if (element) {
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
    }
});

// Keep track of animation loop ID in case you ever need to stop it
let bubbleAnimationFrame = null;

function startBubbles() {
  const container = document.querySelector('.bubbles');
  if (!container) return;

  // Prevent starting multiple loops if called twice
  if (container.dataset.started === "true") return;
  container.dataset.started = "true";

  const bubbleCount = 65;
  const bubbles = [];

  let width = window.innerWidth;
  let height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
  });

  // Initialize bubbles
  for (let i = 0; i < bubbleCount; i++) {
    const el = document.createElement('span');
    el.classList.add('bubble');

    const radius = 12 + Math.random() * 28; // 24px to 80px diameter

    el.style.width = `${radius * 2}px`;
    el.style.height = `${radius * 2}px`;

    container.appendChild(el);

    const bubble = {
      el: el,
      r: radius,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(0.5 + Math.random() * 1.2)
    };

    resetBubblePosition(bubble, bubbles, width, height, true);
    bubbles.push(bubble);
  }

  function resetBubblePosition(b, allBubbles, screenW, screenH, isInitial = false) {
    let attempts = 0;
    let overlapping = true;

    while (overlapping && attempts < 50) {
      b.x = Math.random() * (screenW - b.r * 2) + b.r;
      b.y = isInitial 
        ? Math.random() * screenH 
        : screenH + b.r + Math.random() * 100;

      overlapping = false;
      for (const other of allBubbles) {
        if (other === b) continue;
        const dx = b.x - other.x;
        const dy = b.y - other.y;
        if (Math.hypot(dx, dy) < b.r + other.r) {
          overlapping = true;
          break;
        }
      }
      attempts++;
    }
  }

  function resolveCollisionsBubs() {
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = i + 1; j < bubbles.length; j++) {
        const b1 = bubbles[i];
        const b2 = bubbles[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.hypot(dx, dy);
        const minDist = b1.r + b2.r;

        if (distance < minDist) {
          const overlap = minDist - distance;
          const nx = dx / (distance || 1);
          const ny = dy / (distance || 1);

          b1.x -= nx * overlap * 0.5;
          b1.y -= ny * overlap * 0.5;
          b2.x += nx * overlap * 0.5;
          b2.y += ny * overlap * 0.5;

          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = nx * kx + ny * ky;

          b1.vx -= p * nx;
          b1.vy -= p * ny;
          b2.vx += p * nx;
          b2.vy += p * ny;
        }
      }
    }
  }

  function animateBubs() {
    for (const b of bubbles) {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x - b.r < 0) {
        b.x = b.r;
        b.vx *= -1;
      } else if (b.x + b.r > width) {
        b.x = width - b.r;
        b.vx *= -1;
      }

      if (b.y + b.r < -20) {
        resetBubblePosition(b, bubbles, width, height, false);
      }

      b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
    }

    resolveCollisionsBubs();
    // FIX 1: Fixed function reference name here
    bubbleAnimationFrame = requestAnimationFrame(animateBubs); 
  }

  // Start loop
  animateBubs();
}

// FIX 2: Fixed missing closing parenthesis here
window.addEventListener('load', function () {
    startBubbles();
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
    document.getElementsByTagName("container")[0].classList.toggle("hidden");
}
