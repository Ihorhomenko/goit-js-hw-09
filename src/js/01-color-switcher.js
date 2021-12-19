const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick() {
  refs.start.setAttribute('disabled', true);
  refs.stop.removeAttribute('disabled');
  timerId = setInterval(bodyCreateColor, 1000);
}

function onStopButtonClick() {
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', true);
  clearInterval(timerId);
}

function bodyCreateColor() {
  return (document.body.style.backgroundColor = getRandomHexColor());
}

refs.start.addEventListener('click', onStartButtonClick);
refs.stop.addEventListener('click', onStopButtonClick);
