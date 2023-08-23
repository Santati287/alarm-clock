const timeElement = document.getElementById("time");
const alarmTimeInput = document.getElementById("alarmTime");
const setAlarmButton = document.getElementById("setAlarmButton");
const toggleAlarmButton = document.getElementById("toggleAlarmButton");
const alarmSound = document.getElementById("alarmSound");
const alarmsContainer = document.getElementById("alarms");

let alarms = []; // Array to store alarm times
let alarmInterval;
let isAlarmOn = false;

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    timeElement.textContent = `${hours}:${formatTime(minutes)}:${formatTime(seconds)} ${ampm}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function checkAlarms() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    alarms.forEach(alarm => {
        if (currentTime === alarm.time && alarm.active) {
            playAlarm();
            alarm.active = false;
            updateAlarmsDisplay();
        }
    });
}

function playAlarm() {
    alarmSound.play();
    isAlarmOn = true;
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    isAlarmOn = false;

}

function updateAlarmsDisplay() {
    alarmsContainer.innerHTML = "";

    alarms.forEach((alarm, index) => {

        const alarmElement = document.createElement("div");
        alarmElement.classList.add("alarm-item");

        const alarmText = document.createElement("span");
        alarmText.textContent = `${getAlarmTime(alarm.time)}`;
        alarmElement.appendChild(alarmText);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            deleteAlarm(index);
        });
        alarmElement.appendChild(deleteButton);

        alarmsContainer.appendChild(alarmElement);
    });
}

function getAlarmTime(alarmMinutes) {
    const hours = Math.floor(alarmMinutes / 60);
    const minutes = alarmMinutes % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${formatTime(minutes)} ${ampm}`;
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    updateAlarmsDisplay();
    stopAlarm();
}

setAlarmButton.addEventListener("click", () => {
    const alarmTimeString = alarmTimeInput.value;
    if (alarmTimeString) {
        const [hours, minutes] = alarmTimeString.split(":");
        const alarmMinutes = parseInt(hours) * 60 + parseInt(minutes);
        alarms.push({ time: alarmMinutes, active: true });
        updateAlarmsDisplay();
        alert(`Alarm set for ${hours}:${minutes}`);
    }
});

// toggleAlarmButton.addEventListener("click", () => {
//     if (isAlarmOn) {
//         stopAlarm();
//     } else {
//         playAlarm();
//     }
// });

updateClock();
alarmInterval = setInterval(() => {
    updateClock();
    checkAlarms();
}, 1000);
