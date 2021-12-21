import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let deltaTime = 0;
let time = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > new Date(selectedDates[0])) {
      refs.button.setAttribute('disabled', true);
      return Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      refs.button.removeAttribute('disabled');
    }
    deltaTime = new Date(selectedDates[0]) - new Date();
    time = convertMs(deltaTime);
    updateClockface(time);
  },
};

const chekedDate = flatpickr(refs.input, options);

function onButtonClick() {
  setInterval(() => {
    deltaTime -= 1000;
    time = convertMs(deltaTime);
    updateClockface(time);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${addLeadingZero(days)}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.button.addEventListener('click', onButtonClick);
