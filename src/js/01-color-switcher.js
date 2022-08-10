function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    timerId = setInterval(setBodyColor, 1000);
    function setBodyColor() {
        const color = getRandomHexColor();
        document.body.style.backgroundColor = `${color}`;
        startBtn.setAttribute('disabled', 'disabled');
        stopBtn.removeAttribute('disabled');
    }
}

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
}
