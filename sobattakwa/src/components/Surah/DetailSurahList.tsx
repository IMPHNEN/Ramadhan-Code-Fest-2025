"use client";
import React, { useRef, useState } from "react";

interface DetailSurahProps {
  detailSurah: Surah;
}

export default function DetailSurahList({ detailSurah }: DetailSurahProps) {
  const [currentAyah, setCurrentAyah] = useState(0);
  const audioRefs = useRef<HTMLAudioElement[]>([]); // Array of HTMLAudioElement, initialized as empty

  // Function to handle when the current audio ends
  const handleAudioEnd = (index: number) => {
    if (index < detailSurah.ayahs.length - 1) {
      setCurrentAyah(index + 1); // Move to the next ayah
      document
        .getElementById(`ayah-${index + 1}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      audioRefs.current[index + 1]?.play(); // Play the next audio if it exists
    }
  };

  return (
    <div className="w-full mx-auto max-w-3xl flex justify-center items-center flex-col mt-6">
      <div className="flex flex-col justify-center m-2 mx-6">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl text-yellow-400 font-serif font-extrabold">
            {detailSurah.name}
          </h1>
          <h1 className="font-semibold">{detailSurah.translation}</h1>
          <h2 className="flex justify-end w-full">
            <span className="bg-yellow-400 font-serif bg-opacity-10 w-auto rounded-full">
              Juz {detailSurah.ayahs[0].meta.juz}
            </span>
          </h2>
          <h1 className="flex justify-center text-3xl font-serif mt-4">
            {detailSurah.bismillah.arab}
          </h1>
        </div>

        {detailSurah.ayahs.map((ayah, index) => (
          <div key={ayah.number.inQuran} id={`ayah-${index}`}>
            <div className="p-2 border-none ">
              <h2 className="flex font-bold text-sm sticky top-0 z-20">
                <span className="bg-yellow-400 px-2 bg-opacity-80 font-serif flex justify-start w-fit rounded-full left-0 top-0 ">
                  {ayah.number.inSurah}
                </span>
              </h2>
              <p className="text-right text-4xl font-serif mb-2">{ayah.arab}</p>
              <audio
                ref={(el) => {
                  if (el) {
                    audioRefs.current[index] = el; // Store each audio element in refs
                  }
                }}
                className="w-full h-4 my-2 opacity-70 rounded-lg border-none"
                controls
                preload="none" // Prevents audio from preloading
                onEnded={() => handleAudioEnd(index)} // Auto-scroll to the next Ayah when current one ends
              >
                <source src={ayah.audio.alafasy} type="audio/mpeg" />
                Browser kamu tidak support untuk mpeg
              </audio>
              <p className="text-sm italic">{ayah.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
