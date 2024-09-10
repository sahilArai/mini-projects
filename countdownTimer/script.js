(function () {
    let startBtn = document.querySelector(".startBtn");
    let resetBtn = document.querySelector(".resetBtn");
    
    let hours = document.querySelector(".hours");
    let minutes = document.querySelector(".minutes");
    let seconds = document.querySelector(".seconds");
    
    let countdownTimer = null
    
    let stopInterval = ()=> {
        clearInterval(countdownTimer)
        startBtn.innerHTML = "Start";
        startBtn.style.background = "green"
    }
    startBtn.addEventListener("click", () => {
        if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
            alert("Please select the time")
            return;
        }
        if (startBtn.innerHTML == "Stop") {
            stopInterval();
            return;
        }
        
        let startIntervel = () => {
            startBtn.innerHTML = "Stop";
            startBtn.style.background = "orange"

            countdownTimer = setInterval(() => {
                timer();
            },1000)
        }
        startIntervel()

        let timer = () => {
            if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
                hours.value = "";
                minutes.value = "";
                seconds.value = "";
                stopInterval();
            }
            else if (seconds.value != 0) {
                seconds.value = `${seconds.value <= 10 ? "0" : "" }${seconds.value -1}` ;
            }
            else if (minutes.value != 0 && seconds.value == 0 ) {
                minutes.value = `${minutes.value <= 10 ? "0" : ""}${minutes.value -1}` ;
                seconds.value = 60;
            }
            else if (hours.value != 0 && minutes.value == 0) {
                hours.value = `${hours.value <= 10 ? "0" : ""} ${hours.value -1}`;
                minutes.value = 60
            }
        }

    })
    resetBtn.addEventListener("click", () => {
        seconds.value = "";
        minutes.value = "";
        hours.value = "";
    })


})()