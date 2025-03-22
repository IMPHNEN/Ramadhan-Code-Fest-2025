"use client";
import { useEffect, useState, useMemo } from "react";
import { UrlJadwalSholat } from "@/lib/utils/fetcher";
import { OptionCities } from "@/lib/optionCities";
import LoadingIslami from "@/components/Loading";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Home = () => {
  const [term, setTerm] = useState(
    () => sessionStorage.getItem("selectedCity") || "Padang"
  );
  const [data, setData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const prayerTimes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  // Memoize OptionCities to prevent unnecessary re-renders
  const cachedCities = useMemo(() => OptionCities, []);

  useEffect(() => {
    const cachedData = sessionStorage.getItem(`prayerTimes-${term}`);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${UrlJadwalSholat}${term}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        sessionStorage.setItem(`prayerTimes-${term}`, JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [term]);

  const handleCitySelect = (city: string) => {
    setTerm(city);
    setOpen(false);
    sessionStorage.setItem("selectedCity", city);
  };

  if (loading) return <LoadingIslami />;

  return (
    <div className="h-screen flex flex-col bg-[url('./public/assets/bg-masjid1.jpg')] gap-5 text-[#e3e6e3] bg-cover items-center justify-center">
      <div className="flex flex-col w-full justify-between items-center gap-3 absolute top-5">
        <div className="w-full flex justify-between px-[70px]">
          <div>
            {data && (
              <>
                <div>{data.date.gregorian.weekday.en}</div>
                <div>{data.date.readable}</div>
              </>
            )}
          </div>
          <div>{term}</div>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              className="w-[200px] text-[#e3e6e3] justify-between bg-black hover:bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
            >
              {term || "Pilih Kota"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Cari kota..." className="h-9" />
              <CommandList>
                <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {cachedCities.map((city) => (
                    <CommandItem
                      key={city.label}
                      value={city.label}
                      onSelect={() => handleCitySelect(city.label)}
                    >
                      {city.label}
                      <Check
                        className={
                          term === city.label
                            ? "ml-auto opacity-100"
                            : "ml-auto opacity-0"
                        }
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <ul className="flex flex-col rounded-xl py-2 w-[200px] bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          {data &&
            prayerTimes.map((p) => (
              <li
                key={p}
                className="odd:text-yellow-400 even:text-[#e3e6e3] flex justify-between p-2"
              >
                <div>{p}</div>
                <div className="font-bold">{data.timings[p]}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
