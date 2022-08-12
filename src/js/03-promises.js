import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    for (let index = 0; index < formEl.amount.value; index += 1) {
        createPromise(
            index + 1,
            Number(formEl.delay.value) + Number(formEl.step.value) * index,
        )
            .then(({ position, delay }) => {
                Notiflix.Notify.success(
                    `✅ Fulfilled promise ${position} in ${delay}ms`,
                );
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(
                    `❌ Rejected promise ${position} in ${delay}ms`,
                );
            });
    }
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}
