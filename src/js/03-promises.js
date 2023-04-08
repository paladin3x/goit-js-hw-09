// Add all Notiflix
import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

	// 4. Work with create promise
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve({
					position: position,
					delay: delay,
				}); 
			} else {
				reject({
					position: position,
					delay: delay,
				}); 
			}
		}, delay);
	});

	return promise;
}


// 1. Recieve elements from HTML
const elForm = document.querySelector(".form");
const elInputDelay = document.querySelector("[name=delay]");
const elInputStep = document.querySelector("[name=step]");
const elInputAmount = document.querySelector("[name=amount]");

// 3. Write script which at Submit moment use fun createPromise
elForm.addEventListener("submit", (event) => {
	event.preventDefault();
	
	var delayInterval = parseInt(elInputDelay.value);
	const stepNumber = parseInt(elInputStep.value);
	var promiseNumber = 0;

	if (stepNumber < 0 || delayInterval < 0 || elInputAmount.value < 0) {
		return Notiflix.Notify.failure(`You written value which less than zero!`);
	}

	for (let index = elInputAmount.value; index > 0; index -= 1) {
		promiseNumber += 1;

		createPromise(promiseNumber, delayInterval)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});

		delayInterval += stepNumber;
	}
});