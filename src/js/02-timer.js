import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('.input');
const daysSpanEl = document.querySelector('[data-days]');
const hoursSpanEl = document.querySelector('[data-hours]');
const minutesSpanEl = document.querySelector('[data-minutes]');
const secondsSpanEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;
let timerId = null;
let settedTime;

flatpickr('input#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = new Date().getTime();
        if (selectedDates[0].getTime() < currentTime) {
            Notiflix.Notify.failure('Please choose a date in the future');
            btnStartEl.disabled = true;
            return;
        }
        btnStartEl.disabled = false;
        settedTime = selectedDates[0].getTime();
        Notiflix.Notify.info('Push the Start button');
    },
});

btnStartEl.addEventListener('click', onBtnStartClick);
function onBtnStartClick() {
    btnStartEl.disabled = true;
    inputEl.disabled = true;
    timerId = setInterval(initTimer, 1000);
    function initTimer() {
        let timerTime = settedTime - new Date().getTime();
        if (timerTime <= 0) {
            Notiflix.Notify.success(`it's BEER 🍺 time`);
            clearInterval(timerId);
            inputEl.disabled = false;

            return;
        }
        fillConuterValue(convertMs(timerTime));
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.padStart(2, '0');
}

function fillConuterValue({ days, hours, minutes, seconds }) {
    daysSpanEl.textContent = addLeadingZero(String(days));
    hoursSpanEl.textContent = addLeadingZero(String(hours));
    minutesSpanEl.textContent = addLeadingZero(String(minutes));
    secondsSpanEl.textContent = addLeadingZero(String(seconds));
}
