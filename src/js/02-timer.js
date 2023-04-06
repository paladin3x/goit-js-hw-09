import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refsBtnStart = document.querySelector("[data-start]");
const refDay = document.querySelector("span[data-days]");
const refHour = document.querySelector("span[data-hours]");
const refMinute = document.querySelector("span[data-minutes]");
const refSecond = document.querySelector("span[data-seconds]");

let settingTimeOut = 0;
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
          alert("Please choose a date in the future")
      } else {
          refsBtnStart.disabled = false;
          let startTime = timeReal - selectDate;
          const pushTime = convertMs(-startTime);
          refDay.textContent = pushTime.days;
          refHour.textContent = pushTime.hours;
          refMinute.textContent = pushTime.minutes;
          refSecond.textContent = pushTime.seconds;


        
          
          refsBtnStart.addEventListener("click", loggedTime());  
          function loggedTime() {
              setInterval(() => {
                console.log(Number(startTime) + Number(1000));
           }, 1000)  
}
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


         

       












