// DOM HELPERS //
const startBtn = document.getElementById("timer-btn-start");
const shortBreakBtn = document.getElementById("timer-btn-5");
const longBreakBtn = document.getElementById("timer-btn-15");
const darkModeBtn = document.getElementById("dark-mode-btn");

// GREET USER //
// When the window loads, display random greeting message on top right corner.
// And add a greeting to the pool of random choices depending on what time of the day it is using the "getHours()" method.
window.onload = showRandomGreeting();
function showRandomGreeting() {
    const greetings = new Array("hello, world", "howdy, partner!", "hello, human", "ahoy!", "hi, sunshine!", "'sup?", "hey! what's up?", "how you doin'?");
    const day = new Date();
        let timeOfDay = day.getHours();
        if (timeOfDay >= 5 && timeOfDay < 12) { 
            greetings.push("good morning!");
        }
        else if (timeOfDay >= 12 && timeOfDay <= 17) { 
            greetings.push("good afternoon!");
        }
        else if (timeOfDay >= 18 && timeOfDay <= 23) {
            greetings.push("good evening!");
        }
    const welcomeMessage = Math.floor(greetings.length * Math.random());
    document.getElementById("greeting").innerHTML = greetings[welcomeMessage];
}

// DISPLAY DATE //
// When the window loads, display the written format of the current date and hour.
window.onload = showCurrentTime();
function showCurrentTime() {
    const today = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let currentMonth = months[today.getUTCMonth()];
    let currentDayOfTheWeek = week[today.getUTCDay()];
    let currentDay = today.getUTCDate();
    let currentYear = today.getFullYear();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    
    let currentTime = today.getHours() + ":" + minutes + ":" + seconds;
    
    document.getElementById("date").innerHTML = currentDayOfTheWeek + ", " + currentMonth + " " + currentDay + ", " + currentYear + " — " + currentTime;
    document.getElementById("currentYear").innerHTML = currentYear;
    
    setTimeout("showCurrentTime()", 1000);
}

// DISPLAY POPUP //
// Select the two menu elements and create new divs to display different popups on the screen.
document.getElementById("list-el-1").addEventListener("click", function () {showPopup("last sessions: " + sessions)});
document.getElementById("list-el-2").addEventListener("click", function () {showPopup(instructions)});
let sessions = new Array();
let instructions = document.getElementById("instructions").textContent;
let popup;
let backdrop;

function showPopup(text) {
    if (popup) {
        return;
    }

popup = document.createElement('div');
popup.className = "popup";

const popupTextBox = document.createElement('div');
popupTextBox.className = "popup-text";

const popupText = document.createElement('p');
popupText.innerHTML = text;

const closePopupBtn = document.createElement('button');
closePopupBtn.textContent = "OK";
closePopupBtn.className = "close-btn";
closePopupBtn.addEventListener("click", closePopup);

popup.append(popupTextBox);
popupTextBox.append(popupText);
popup.append(closePopupBtn);

backdrop = document.createElement('div');
backdrop.className = "backdrop";
backdrop.addEventListener("click", closePopup);
document.body.append(backdrop);
backdrop.append(popup);
}

function closePopup() {
    popup.remove();
    popup = null;
    backdrop.remove();
    backdrop = null;
}

// SOUND ALERT //
function playSound() {
    const audio = new Audio('./assets/beep.mp3');
    audio.play();
}

// TIMER FUNCTION //
// Create the timer countdown function using the "setTimeOut()" method and apply it to different timers (25, 20 and 5 minutes).
let startClick = false;
let shortBreakClick = false;
let longBreakClick = false;
let totalSeconds = 0;
let counter;
let timer;

function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minutes * 60);
    
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
                
    document.getElementById("timer").innerHTML = hour + ":" + minutes + ":" + seconds;

    // Add last session to log and play beeping sound when the timer finishes.
    if (minutes >= timer) {
        sessions.push(" " + "<br>" + timer + ":" + "00");
        playSound();
        if (timer > 24) {
            stopTimer();
            startBtn.innerHTML = "RESTART";
        }
    else {
        stopTimer();
    }};
}

// Reset Buttons to default names and reset timer.
function resetBtns() {
    startBtn.innerHTML = "START";
    shortBreakBtn.innerHTML = "5 MIN BREAK";
    longBreakBtn.innerHTML = "20 MIN BREAK";
    document.getElementById("timer").innerHTML = "0:00:00"
}

// Stop counter and call the reset function.
function stopTimer() {
    clearInterval(counter);
    startClick = false;
    longBreakClick = false;
    shortBreakClick = false;
    totalSeconds = 0;
    resetBtns();
}

// Start 25 minute timer.
startBtn.addEventListener("click", 
    function() {
        timer = 25;
        if (!startClick) {
            stopTimer();
            startBtn.innerHTML = "STOP TIMER";
            counter = setInterval(countTimer, 1000);
            startClick = true;
        }
        else {
            stopTimer();
        }
    }
);

// Start 5 minute timer.
shortBreakBtn.addEventListener("click", 
    function() {
        timer = 5;
        if (!shortBreakClick) {
            stopTimer();
            shortBreakBtn.innerHTML = "STOP BREAK";
            totalSeconds = 0;
            counter = setInterval(countTimer, 1000);
            shortBreakClick = true;
        }
        else {
            stopTimer();
        }
    }
);

// Start 20 minute timer.
longBreakBtn.addEventListener("click",
    function() {
        timer = 20;
        if (!longBreakClick) {
            stopTimer();
            longBreakBtn.innerHTML = "STOP BREAK";
            totalSeconds = 0;
            counter = setInterval(countTimer, 1000);
            longBreakClick = true;
        }
        else {
            stopTimer();
        }
    }
);