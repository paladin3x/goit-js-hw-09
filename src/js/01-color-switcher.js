function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    btnStart: document.querySelector("[data-start]"),
    btnStop: document.querySelector("[data-stop]"),
    bodyDoc: document.querySelector("body")
}

let idInterval = null; 

refs.btnStart.addEventListener("click", () => {
    idInterval = setInterval(function startGenerateBackground() {
    const randomColor = getRandomHexColor();
    refs.bodyDoc.style.backgroundColor = randomColor;
    refs.btnStart.disabled = true;
}, 1000);});

refs.btnStop.addEventListener("click", () => {
    clearInterval(idInterval);
    refs.btnStart.disabled = false;
});



