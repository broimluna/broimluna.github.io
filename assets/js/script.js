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