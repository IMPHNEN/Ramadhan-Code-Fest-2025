"use client";
import { useState } from "react";
import DoaItem from "../Doa/DoaItem";
import { Input } from "../ui/input";
// Define props for DoaList to include typing for dataDoa
interface DoaListProps {
  dataDoa: Doa[];
}

export default function DoaList({ dataDoa }: DoaListProps) {
  const [query, setQuery] = useState("");
  return (
    <div className="w-full flex flex-col gap-2 mt-4">
      <div className="flex justify-center mx-10">
        <Input
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          placeholder="Cari Do`a.."
        />
      </div>
      {dataDoa
        .filter((doa) => doa.doa.toLocaleLowerCase().includes(query))
        .map(
          (
            doa //doa.doa judul doa
          ) => (
            <div key={doa.id}>
              {/* Pass the relevant data to DoaItem */}
              <DoaItem
                id={doa.id}
                doa={doa.doa}
                ayat={doa.ayat}
                latin={doa.latin}
                artinya={doa.artinya}
                query={query}
              />
            </div>
          )
        )}
    </div>
  );
}
