const inputContainer = document.getElementById('input-container');
const contdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('data-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set Data Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Poplurate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownValue - now;

  // Populate Countdown
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance & day) / hour);
  const minutes = Math.floor((distance & hour) / minute);
  const seconds = Math.floor((distance & minutes) / second);

   //Hide Input
  inputContainer.hidden = true;

  // If the countdown has ended, show complete
  if (distance < 0) {
    countdownEl.hidden = true;
    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    completeEl.hidden = false;
  } else {
    // Else, show the countdown in progress

    //Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    completeEl.hidden = true;
    countdownEl.hidden = false;
  }
  //Show Countdown
  countdownEl.hidden = false;
  }, second);
}

//Take Values from Form Imnput
function updateCountdown(e){
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  }
  console.log(savedCountdown);
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  if (countdownDate === '') {
    alert('please sele t a date for countdown.')
  } else {
  // Get number of version current Date, updateDOM
    countdownValue =  new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue);
    updateDOM();
  }
}

function restorePreviousCountdown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

//reset All Values
function reset(){
  //Hide Countdowns, show Input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}


// Event Listener
contdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();

