interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

interface DateInfo {
  readable: string;
  gregorian: {
    weekday: {
      en: string;
    };
  };
}

interface PrayerTimesData {
  timings: Timings;
  date: DateInfo;
}
