import Notiflix from 'notiflix';

const form = document.querySelector(`.form`);

form.addEventListener(`submit`, onFormSubmit);
console.log(form.elements);

function onFormSubmit(event) {
  event.preventDefault();

  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = event.target;

  console.log(delay, step, amount);

  promisesCycle(Number(delay), Number(step), Number(amount));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function promisesCycle(delay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    const promisePosition = i + 1;
    const delayAmount = delay + step * i;

    createPromise(promisePosition, delayAmount).then(onResolve).catch(onReject);
  }
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
