function getHijriYear() {
    const currentYear = new Date().getFullYear();
    const hijriYear = Math.floor(currentYear - 622 + (currentYear - 622) / 32);
    return hijriYear;
}

function getAsliYear() {
    const currentYear = new Date().getFullYear();
    const asliYear = currentYear;
    return asliYear;
}

function updateTitleWithHijriYear() {
    const hijriYear = getHijriYear();
    const tahunasli = getAsliYear();
    const title = document.querySelector('title');
    title.textContent = `Selamat Menyambut Ramadhan ${tahunasli} - ${hijriYear} H`;
}

document.addEventListener('DOMContentLoaded', updateTitleWithHijriYear);