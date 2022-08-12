function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(setBodyColor, 1000);
    function setBodyColor() {
        const color = getRandomHexColor();
        document.body.style.backgroundColor = `${color}`;
    }
}

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}
