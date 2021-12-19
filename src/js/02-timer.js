import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    return selectedDates[0];
  },
};

const chekedDate = flatpickr(refs.input, options);

function onInputDate() {
  if (new Date() > new Date(chekedDate.selectedDates.join())) {
    refs.button.setAttribute('disabled', true);
    window.alert('Please choose a date in the future');
  } else {
    refs.button.removeAttribute('disabled');
    const ms = new Date(chekedDate.selectedDates.join()) - new Date();

    console.log(convertMs(ms));
  }
}

function onButtonClick() {
  console.log('click');
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

refs.input.addEventListener('input', onInputDate);

refs.button.addEventListener('click', onButtonClick);
