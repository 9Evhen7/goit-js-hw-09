import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const myInput = document.querySelector("#datetime-picker");
const startButtonRef = document.querySelector('button[data-start]')
const daysLableRef = document.querySelector('span[data-days]')
const hoursLableRef = document.querySelector('span[data-hours]')
const minutesLableRef = document.querySelector('span[data-minutes]')
const secondsLableRef = document.querySelector('span[data-seconds]')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      onDateChoose(selectedDates[0]);
    },
};

const fp = flatpickr(myInput, options);


startButtonRef.disabled = true;

startButtonRef.addEventListener('click', onClick);


function onDateChoose(selectedDate) { 
    if (selectedDate < options.defaultDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
    } else { 
        startButtonRef.disabled = false;
    }
};

function onClick() { 
    startButtonRef.disabled = true;
    myInput.disabled = true;
    doAction();
}

function doAction() { 
    setInterval(() => {
        const result = fp.selectedDates[0] - new Date();
        if (result < 0) { 
            return;
        }
        const {days, hours, minutes, seconds} = convertMs(result);

    daysLableRef.textContent = addLeadingZero(days);
    hoursLableRef.textContent = addLeadingZero(hours);
    minutesLableRef.textContent = addLeadingZero(minutes);
    secondsLableRef.textContent = addLeadingZero(seconds);

}, 1000)
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

function addLeadingZero(str) { 
    return `${str}`.padStart(2, '0');
}

