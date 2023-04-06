import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refsBtnStart = document.querySelector("[data-start]");
const refDay = document.querySelector("span[data-days]");
const refHour = document.querySelector("span[data-hours]");
const refMinute = document.querySelector("span[data-minutes]");
const refSecond = document.querySelector("span[data-seconds]");

refsBtnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectDate = selectedDates[0].getTime();
      const nowDate = new Date();
      const timeReal = nowDate.getTime();
      if (timeReal > selectDate) { 
          Notiflix.Notify.failure("Please choose a date in the future")
      } else {
          refsBtnStart.disabled = false;
          let startTime = timeReal - selectDate;
          const {days, hours, minutes, seconds} = convertMs(-startTime);
          refDay.textContent = days;
          refHour.textContent = hours;
          refMinute.textContent = minutes;
          refSecond.textContent = seconds;
          localStorage.setItem('timer', -startTime);
      }  
  },
};


flatpickr("input#datetime-picker", options);

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

let idInterval = null; 

refsBtnStart.addEventListener("click", loggedTime);  
function loggedTime() {
    idInterval = setInterval(() => {
             if (localStorage.getItem('timer') < 1000) {
                 clearInterval(idInterval)  
                 localStorage.removeItem('timer');
            return;
    } 
        let msTimer = localStorage.getItem('timer') - 1000;
        localStorage.setItem('timer', (msTimer))
        const {days, hours, minutes, seconds} = convertMs(msTimer);
          refDay.textContent = addLeadingZero(`${days}`);
        refHour.textContent = addLeadingZero(`${hours}`);
          refMinute.textContent = addLeadingZero(`${minutes}`);
        refSecond.textContent = addLeadingZero(`${seconds}`);
           }, 1000)
    }

function addLeadingZero(value) {return value.padStart(2, "0")}
    













