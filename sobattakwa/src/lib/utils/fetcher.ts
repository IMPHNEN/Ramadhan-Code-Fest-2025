export const UrlJadwalSholat =
  "https://api.aladhan.com/v1/timingsByAddress?address=";
export const UrlDoa = "https://doa-doa-api-ahmadramadhan.fly.dev/api/";
export const UrlSurah = "https://quran-api-id.vercel.app/surahs/";

//fetching Surah
export async function getSurah(): Promise<typeSurahList[] | null> {
  const url = new URL(`${UrlSurah}`);
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch Surah: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Surah:", error);
    return null;
  }
}

//fetching Doa
export async function getDoa(): Promise<Doa[] | null> {
  const url = new URL(`${UrlDoa}`);
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch Doa: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Doa:", error);
    return null;
  }
}
