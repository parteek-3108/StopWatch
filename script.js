var seconds, minutes, hours, timeIntervalId, blinkIntervalId;

const lapInfoClasses = 'd-flex justify-content-between pb-1 pt-3 border-top';
const time = document.getElementsByTagName('label')[0];
const lapBtn = document.getElementsByClassName('LapParent')[0];
const startBtn = document.getElementsByClassName('startParent')[0];
const stopBtn = document.getElementsByClassName('stopParent')[0];
const resetBtn = document.getElementsByClassName('resetParent')[0];
const track = document.getElementById('track');
const lapDataList = document.getElementsByClassName('border-top');

function getTime() {
    return (hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds;
}

function timerOn() {
    timeIntervalId = setInterval(function() {
        seconds++;
        if(seconds === 60) {
            seconds = 0;
            minutes++;
            if(minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        time.innerHTML = getTime();
    }, 1000);
}

startBtn.addEventListener('click', function() {
    timerOn();
    lapBtn.classList.remove('disabled');
    startBtn.classList.add('d-none');
    stopBtn.classList.remove('d-none');
});

lapBtn.addEventListener('click', function() {
    var div = document.createElement('div');
    div.className = lapInfoClasses;
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    p1.innerHTML = `Lap ${lapDataList.length + 1}`
    p2.innerHTML = getTime();
    div.appendChild(p1);
    div.appendChild(p2);
    track.prepend(div);
});

stopBtn.addEventListener('click', function() {
    clearInterval(timeIntervalId);
    lapBtn.classList.add('d-none');
    resetBtn.classList.remove('d-none');
    time.classList.add('blink');
});

resetBtn.addEventListener('click', function() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    time.classList.remove('blink');
    time.innerHTML = getTime();
    lapBtn.classList.remove('d-none');
    startBtn.classList.remove('d-none');
    lapBtn.classList.add('disabled');
    stopBtn.classList.add('d-none');
    resetBtn.classList.add('d-none');
    for(let i = 0; i < lapDataList.length; i) track.removeChild(lapDataList[i]);
});

resetBtn.click();