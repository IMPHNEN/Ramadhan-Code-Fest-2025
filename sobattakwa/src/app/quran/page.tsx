import SurahList from "@/components/Surah/SurahList";
import { getSurah } from "@/lib/utils/fetcher";

export default async function Surah() {
  const dataSurah: typeSurahList[] | null = await getSurah();
  return (
    <main className="w-full flex justify-center items-start min-h-screen mt-5">
      <section className="w-full max-w-3xl flex justify-center items-center flex-col">
        <h1 className="m-2 text-center font-sans font-extrabold text-4xl">
          Baca <span className="text-yellow-400">Al-Qur`an</span>
        </h1>
        <div>
          {dataSurah ? (
            <SurahList dataSurah={dataSurah} />
          ) : (
            <p>Failed to load</p>
          )}
        </div>
      </section>
    </main>
  );
}
