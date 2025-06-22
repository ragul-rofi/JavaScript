const clock = document.getElementById("clock");

// func to update time

function updateclock(){
    const now = new Date();

    let hrs = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();


    // pad with 0 if < 10 (eg: 9 -> 09)
    hrs = String(hrs).padStart(2,"0");
    min = String(min).padStart(2,"0");
    sec = String(sec).padStart(2,"0");

    const currtime = `${hrs}:${min}:${sec}`;
    clock.textContent = currtime;
}

// initial call
updateclock();

// update every second
setInterval(updateclock,1000);