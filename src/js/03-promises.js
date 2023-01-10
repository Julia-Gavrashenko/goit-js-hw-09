

const form = document.querySelector(`.form`);

form.addEventListener(`submit`, onFormSubmit);
console.log(form.elements);

function onFormSubmit(event) {
  event.preventDefault();

  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = event.target.elements;

  console.log(delay, step, amount);
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
  for (let i = 0; i < amount; i += 1){
  


    

    createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}

createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
