// Fungsi untuk format waktu menjadi HH:MM:SS
function formatTime(date) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(date);
}

// Fungsi untuk memperbarui waktu
function updateClock() {
  const now = new Date();
  document.getElementById("current-time").textContent = formatTime(now);
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchPrayerTimes, showError);
  } else {
    document.getElementById("loading-indicator").innerHTML =
      "<p>Geolocation tidak didukung oleh browser Anda.</p>";
  }
}

function fetchPrayerTimes(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const date = new Date().toISOString().slice(0, 10);
  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=5`;

  // Membuat elemen anchor
  const link = document.createElement("a");
  link.href = `https://www.google.com/maps/place/${latitude},${longitude}`;
  link.target = "_blank";
  link.style.color = "white";
  link.textContent = "Klik untuk lihat di Google Maps";

  // Menampilkan informasi lokasi dengan teks biasa dan link yang dapat diklik
  const locationInfo = document.getElementById("location-info");
  locationInfo.textContent = `Lokasi: ${latitude.toFixed(
    4
  )}, ${longitude.toFixed(4)}\nGaris Bujur: ${longitude.toFixed(
    4
  )}\nGaris Lintang: ${latitude.toFixed(4)}\n`;

  // Menambahkan link ke dalam elemen location-info
  locationInfo.appendChild(link);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        document.getElementById("loading-indicator").style.display = "none";
        document.getElementById("prayer-cards").style.display = "block";

        const timings = data.data.timings;
        document.getElementById("imsak").textContent = timings.Imsak;
        document.getElementById("fajr").textContent = timings.Fajr;
        document.getElementById("sunrise").textContent = timings.Sunrise;
        document.getElementById("dhuhr").textContent = timings.Dhuhr;
        document.getElementById("asr").textContent = timings.Asr;
        document.getElementById("maghrib").textContent = timings.Maghrib;
        document.getElementById("isha").textContent = timings.Isha;
        document.getElementById("midnight").textContent = timings.Midnight;
        document.getElementById("sepertigamalam").textContent =
          timings.Firstthird;
        document.getElementById("akhirwaktu").textContent = timings.Lastthird;

        // Update date with hijri date using local calculation
        const hijriDate = calculateHijriDate(new Date());
        document.getElementById(
          "current-date"
        ).textContent = `${date} | ${hijriDate.day} ${hijriDate.month} ${hijriDate.year}H`;
      } else {
        document.getElementById("loading-indicator").innerHTML =
          "<p>Gagal mengambil data jadwal sholat</p>";
      }
    })
    .catch((error) => {
      document.getElementById("loading-indicator").innerHTML =
        "<p>Terjadi kesalahan saat mengambil data</p>";
    });
}

function showError(error) {
  let message = "";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "Pengguna menolak permintaan lokasi.";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "Lokasi tidak tersedia.";
      break;
    case error.TIMEOUT:
      message = "Waktu untuk mendapatkan lokasi telah habis.";
      break;
    case error.UNKNOWN_ERROR:
      message = "Terjadi kesalahan yang tidak diketahui.";
      break;
  }
  document.getElementById("loading-indicator").innerHTML = `<p>${message}</p>`;
}

// Fungsi untuk menghitung tanggal Hijriah
function calculateHijriDate(date) {
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi'ul Awwal",
    "Rabi'ul Akhir",
    "Jumadil Awwal",
    "Jumadil Akhir",
    "Rajab",
    "Sya'ban",
    "Ramadhan",
    "Syawwal",
    "Dzulqa'dah",
    "Dzulhijjah",
  ];
//   const hijriYear = Math.floor(date.getFullYear() - 622 + (date.getFullYear() - 622) / 32);
  const hijriYear = Math.floor(date.getFullYear() - 579);
  const hijriMonth = hijriMonths[date.getMonth() * 4];
  const hijriDay = date.getDate();
  return { day: hijriDay, month: hijriMonth, year: hijriYear };
}

// Set current date
const today = new Date();
document.getElementById("current-date").textContent = formatDate(today);

// Initialize on page load
window.onload = function () {
  getUserLocation();
  setInterval(updateClock, 1000); // Memperbarui jam setiap detik
  updateClock(); // Memperbarui jam saat halaman dimuat
};
