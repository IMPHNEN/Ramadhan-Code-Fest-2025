function updateCountdown() {
    const lebaran = new Date("March 31, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = lebaran - now;
    const countdownElement = document.getElementById("countdown");

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = 
            `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
    } else {
        countdownElement.innerHTML = "Selamat Hari Raya Idul Fitri 2025! 🎉";
        countdownElement.classList.add("celebrate");
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
