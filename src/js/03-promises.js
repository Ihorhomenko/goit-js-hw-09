import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}

function onSumitForm(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  setTimeout(() => {
    let position = 1;
    let delayLog = Number(delay.value);
    createPromise(position, delayLog).then(onFulfilled).catch(onRejected);
    const idTimer = setInterval(() => {
      position += 1;
      if (position === Number(amount.value)) {
        clearInterval(idTimer);
      }
      delayLog += Number(step.value);
      createPromise(position, delayLog).then(onFulfilled).catch(onRejected);
    }, step.value);
  }, delay.value);
}

refs.form.addEventListener('submit', onSumitForm);

function onFulfilled(result) {
  Notify.success(`${result}`);
}
function onRejected(error) {
  Notify.failure(`${error}`);
}
