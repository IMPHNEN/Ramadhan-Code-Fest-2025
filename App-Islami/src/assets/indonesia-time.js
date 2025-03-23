let currentDate = new Date();

const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

const Months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// const Days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
const formattedDate = `${date} ${Months[month]} ${year}`;

const greeting = () => {
  let hour = currentDate.getHours();
  if (hour >= 5 && hour < 11) {
    return "Pagi";
  } else if (hour >= 11 && hour < 15) {
    return "Siang";
  } else if (hour >= 15 && hour < 18) {
    return "Sore";
  } else {
    return "Malam";
  }
};

export { formattedDate, greeting };
