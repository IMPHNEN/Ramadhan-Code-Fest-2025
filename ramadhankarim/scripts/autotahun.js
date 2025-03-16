function getHijriYear() {
    const currentYear = new Date().getFullYear();
    const hijriYear = Math.floor(currentYear - 622 + (currentYear - 622) / 32);
    return hijriYear;
}

function getYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
}

document.addEventListener('DOMContentLoaded', function() {
    const hijriElement = document.getElementById('hijri-year');
    const yearElement = document.getElementById('year');

    if (yearElement) {
        yearElement.innerText = getYear();
    }

    if (hijriElement) {
        hijriElement.innerText = getHijriYear();
    }
});
