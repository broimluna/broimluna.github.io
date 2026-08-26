function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', function () {
    const loader = document.querySelector('loading');
    if (!loader) return;

    // Use a slightly shorter sleep if 4.1s feels too long for users
    sleep(4100).then(() => {
        // Apply the "pop" and fade simultaneously
        loader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        loader.style.transform = 'scale(1.1)';
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none'; // Prevent clicking through during fade

        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
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
    const size = 15 + Math.random() * 60; // Slightly smaller for better performance
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 15;
    
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${left}%`;
    b.style.opacity = (Math.random() * 0.4 + 0.2).toString(); // Varied transparency
    b.dataset.duration = duration;
    
    // Add a slight blur to some bubbles for depth of field
    b.style.filter = Math.random() > 0.5 ? 'blur(1px)' : 'none';
}
});


function startTime() {
    const now = new Date();
    // 'en-GB' gives 24h format, 'en-US' gives 12h.
    const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timehtml = document.getElementById("sidetime");
    if (timehtml) timehtml.textContent = timeString;
}

// Update time every second

setInterval(startTime, 1000);

function togglecontainer() {
    document.getElementsByTagName("container")[0].classList.toggle("hidden")
}
