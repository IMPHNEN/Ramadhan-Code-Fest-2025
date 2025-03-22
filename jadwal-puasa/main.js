// State variables
let cities = [];
let selectedCity = null;
let selectedDate = new Date();
let currentMonth = selectedDate.getMonth();
let currentYear = selectedDate.getFullYear();

// DOM Elements
const citySelectBtn = document.getElementById("citySelectBtn");
const citySelectDropdown = document.getElementById("citySelectDropdown");
const citySearchInput = document.getElementById("citySearchInput");
const cityOptions = document.getElementById("cityOptions");
const selectedCityText = document.getElementById("selectedCityText");

const dateSelectBtn = document.getElementById("dateSelectBtn");
const calendarDropdown = document.getElementById("calendarDropdown");
const selectedDateText = document.getElementById("selectedDateText");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const imsakTime = document.getElementById("imsakTime");
const iftarTime = document.getElementById("iftarTime");
const statusMessage = document.getElementById("statusMessage");

// Initialize the app
async function init() {
  updateSelectedDateText();
  renderCalendar();

  try {
    await fetchCities();
    if (cities.length > 0) {
      selectedCity = cities[0];
      selectedCityText.textContent = selectedCity.lokasi;
      await updatePrayerTimes();
    }
  } catch (error) {
    showStatusMessage(
      "Gagal memuat data kota. Silakan coba lagi nanti.",
      "error"
    );
    console.error("Error fetching cities:", error);
  }

  // Set up event listeners
  document.addEventListener("click", handleOutsideClick);
  citySelectBtn.addEventListener("click", toggleCityDropdown);
  citySearchInput.addEventListener("input", handleCitySearch);
  dateSelectBtn.addEventListener("click", toggleCalendarDropdown);
  prevMonthBtn.addEventListener("click", goToPrevMonth);
  nextMonthBtn.addEventListener("click", goToNextMonth);
}

// Fetch cities from API
async function fetchCities() {
  try {
    const response = await fetch(
      "https://api.myquran.com/v2/sholat/kota/semua"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.status && Array.isArray(data.data)) {
      cities = data.data;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

// City select functions
function populateCityOptions(filter = "") {
  cityOptions.innerHTML = "";

  if (cities.length === 0) {
    const noResult = document.createElement("div");
    noResult.className = "p-3 text-center font-pixel text-sm text-white";
    noResult.textContent = "Tidak ada data kota";
    cityOptions.appendChild(noResult);
    return;
  }

  const filteredCities = cities.filter((city) =>
    city.lokasi.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCities.length === 0) {
    const noResult = document.createElement("div");
    noResult.className = "p-3 text-center font-pixel text-sm text-white";
    noResult.textContent = "Kota tidak ditemukan";
    cityOptions.appendChild(noResult);
    return;
  }

  filteredCities.forEach((city) => {
    const option = document.createElement("div");
    option.className =
      "custom-select-option p-3 cursor-pointer font-pixel text-sm text-white";
    option.textContent = city.lokasi;
    option.addEventListener("click", () => selectCity(city));
    cityOptions.appendChild(option);
  });
}

function toggleCityDropdown(e) {
  e.stopPropagation();
  citySelectDropdown.classList.toggle("hidden");
  if (!citySelectDropdown.classList.contains("hidden")) {
    citySearchInput.focus();
    citySearchInput.value = "";
    populateCityOptions();
  }
}

function handleCitySearch() {
  populateCityOptions(citySearchInput.value);
}

async function selectCity(city) {
  selectedCity = city;
  selectedCityText.textContent = city.lokasi;
  citySelectDropdown.classList.add("hidden");

  try {
    await updatePrayerTimes();
  } catch (error) {
    showStatusMessage("Gagal memuat jadwal. Silakan coba lagi nanti.", "error");
    console.error("Error updating prayer times:", error);
  }
}

// Calendar functions
function updateSelectedDateText() {
  const options = { day: "numeric", month: "long", year: "numeric" };
  selectedDateText.textContent = selectedDate.toLocaleDateString(
    "id-ID",
    options
  );
  currentMonthYear.textContent = new Date(
    currentYear,
    currentMonth,
    1
  ).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

function renderCalendar() {
  // Clear existing calendar days after the header row
  const calendarElement = document.querySelector(".custom-calendar");
  while (calendarElement.children.length > 7) {
    calendarElement.removeChild(calendarElement.lastChild);
  }

  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Adjust for Monday as first day of week (0 = Sunday, 1 = Monday, etc.)
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;

  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty-day";
    calendarElement.appendChild(emptyDay);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day text-xs text-white";
    dayElement.textContent = day;

    // Check if this day is the selected date
    const currentDate = new Date(currentYear, currentMonth, day);
    if (currentDate.toDateString() === selectedDate.toDateString()) {
      dayElement.classList.add("selected-day");
    }

    dayElement.addEventListener("click", () => selectDate(day));
    calendarElement.appendChild(dayElement);
  }
}

function toggleCalendarDropdown(e) {
  e.stopPropagation();
  calendarDropdown.classList.toggle("hidden");
}

function goToPrevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateSelectedDateText();
  renderCalendar();
}

function goToNextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateSelectedDateText();
  renderCalendar();
}

async function selectDate(day) {
  selectedDate = new Date(currentYear, currentMonth, day);
  updateSelectedDateText();
  renderCalendar();
  calendarDropdown.classList.add("hidden");

  try {
    await updatePrayerTimes();
  } catch (error) {
    showStatusMessage("Gagal memuat jadwal. Silakan coba lagi nanti.", "error");
    console.error("Error updating prayer times:", error);
  }
}

// Format date for API request (YYYY-MM-DD)
function formatDateForAPI(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Prayer times from API
async function updatePrayerTimes() {
  if (!selectedCity) {
    return;
  }

  // Reset times
  imsakTime.textContent = "--:--";
  iftarTime.textContent = "--:--";

  // Show loading state
  imsakTime.innerHTML = '<div class="loading-spinner mx-auto"></div>';
  iftarTime.innerHTML = '<div class="loading-spinner mx-auto"></div>';

  try {
    const formattedDate = formatDateForAPI(selectedDate);
    const url = `https://api.myquran.com/v2/sholat/jadwal/${selectedCity.id}/${formattedDate}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status && data.data && data.data.jadwal) {
      const jadwal = data.data.jadwal;
      imsakTime.textContent = jadwal.imsak;
      iftarTime.textContent = jadwal.maghrib;
      hideStatusMessage();
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    imsakTime.textContent = "--:--";
    iftarTime.textContent = "--:--";
    showStatusMessage("Gagal memuat jadwal. Silakan coba lagi nanti.", "error");
    throw error;
  }
}

// Status message functions
function showStatusMessage(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.classList.remove("hidden");

  if (type === "error") {
    statusMessage.classList.remove("bg-ramadan-primary");
    statusMessage.classList.add("bg-red-500");
  } else {
    statusMessage.classList.remove("bg-red-500");
    statusMessage.classList.add("bg-ramadan-primary");
  }
}

function hideStatusMessage() {
  statusMessage.classList.add("hidden");
}

// Handle clicks outside dropdowns
function handleOutsideClick(e) {
  if (
    !citySelectBtn.contains(e.target) &&
    !citySelectDropdown.contains(e.target)
  ) {
    citySelectDropdown.classList.add("hidden");
  }

  if (
    !dateSelectBtn.contains(e.target) &&
    !calendarDropdown.contains(e.target)
  ) {
    calendarDropdown.classList.add("hidden");
  }
}

// Add random stars to the background
function addRandomStars() {
  const body = document.body;
  const maxStars = 20;

  for (let i = 0; i < maxStars; i++) {
    const star = document.createElement("div");
    star.className = "star absolute twinkle";

    // Random position
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    // Random size
    const size = 2 + Math.random() * 4;

    // Random animation delay
    const delay = Math.random() * 3;

    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;

    body.appendChild(star);
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  init();
  addRandomStars();
});
