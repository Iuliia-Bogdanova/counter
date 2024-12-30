import { isCurrentPage } from "./utils.js";

export function initTimer() {
    if (!isCurrentPage("home-page")) return;

    const timerElements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };

    if (
        !timerElements.days ||
        !timerElements.hours ||
        !timerElements.minutes ||
        !timerElements.seconds
    ) {
        console.error("Timer elements not found");
        return;
    }

    function updateTimer() {
        const now = new Date();
        const newYear = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1));
        const diff = Math.max(0, newYear - now);

        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        timerElements.days.textContent = days;
        timerElements.hours.textContent = hours;
        timerElements.minutes.textContent = minutes;
        timerElements.seconds.textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}
