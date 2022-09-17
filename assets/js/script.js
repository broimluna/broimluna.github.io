function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    }

function startTime(){
        var date = new Date();
        var h = date.getHours(); 
        var m = date.getMinutes(); 
        //var s = date.getSeconds(); 
        var session = "AM";
        
        if(h == 0){
            h = 12;
        }
        
        if(h > 12){
            h = h - 12;
            session = "PM";
        }
        
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        // s = (s < 10) ? "0" + s : s;
        
        var time = h + ":" + m + " " + session;
        document.getElementById("time").innerText = time;
        document.getElementById("time").textContent = time;
        setTimeout(startTime, 1000);
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }