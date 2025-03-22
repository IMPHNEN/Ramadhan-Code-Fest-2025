"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import SurahItem from "./SurahItem";

interface SurahListProps {
  dataSurah: typeSurahList[];
}

export default function SurahList({ dataSurah }: SurahListProps) {
  const [query, setQuery] = useState("");
  return (
    <div className="w full flex flex-col gap-y-2 mt-4">
      <div className="flex justify-center mx-10 lg:mx-48">
        <Input
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          placeholder="Cari Surah"
        />
      </div>
      <div className="grid w-screen lg:px-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataSurah
          .filter((surah) => surah.name.toLocaleLowerCase().includes(query))
          .map(
            (
              surah //surah.surah judul surah
            ) => (
              <div key={surah.number}>
                {/* Pass the relevant data to surahItem */}
                <SurahItem
                  query={query}
                  number={surah.number}
                  name={surah.name}
                  translation={surah.translation}
                  revelation={surah.revelation}
                  numberOfAyahs={surah.numberOfAyahs}
                  description={surah.description}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
}
