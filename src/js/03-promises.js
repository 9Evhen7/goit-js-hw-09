import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', (e) => { 
  e.preventDefault();

  const delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value)
  let delayStep = delay;
  for (let i = 0; i < amount; i+=1) {
    createPromise(i+1, delayStep)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayStep += step;
  }
  formRef.reset();
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
  } else {
        reject({position, delay})
  }}, delay)
  })
 
}