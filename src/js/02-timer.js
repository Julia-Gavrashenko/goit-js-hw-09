import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const daysEl = document.querySelector(`span[data-days]`);
const hoursEl = document.querySelector(`span[data-hours]`);
const minutesEl = document.querySelector(`span[data-minutes]`);
const secondsEl = document.querySelector(`span[data-seconds]`);

const inputEl = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`button[data-start]`);
const timerEl = document.querySelector(`timer`);



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= defaultDate) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
};

const calendar = flatpickr(inputEl, options);
let intervalId = null;

startBtn.addEventListener(`click`, onStartBtnClick);
function onStartBtnClick() {
  timer.start();
}

const timer = {
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      const selectedDate = calendar.selectedDates[0];
      const currentDate = calendar.defaultDate;
      const timeDifference = selectedDate - currentDate;

      

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(timeDifference);  
      console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
    }, 1000);
  },
};



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timerMarkup({date}) {
  daysEl.textContent = date.days;
  hoursEl.textContent = date.hours;
  minutesEl.textContent = date.minutes;
  secondsEl.textContent = date.seconds;
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
