const countdownDate = new Date('Apr 2, 2025 00:00:00').getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(timer);
    }
}, 1000);

setTimeout(() => {
    document.querySelector('.lantern').classList.add('animate');
}, 1000);
setTimeout(() => {
    document.querySelector('.star-1').classList.add('animate');
}, 2000);

function scrollCarousel(direction) {
    const carousel = document.getElementById("tipsCarousel");
    const cardWidth = document.querySelector(".tip-card").offsetWidth + 15;
    carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}