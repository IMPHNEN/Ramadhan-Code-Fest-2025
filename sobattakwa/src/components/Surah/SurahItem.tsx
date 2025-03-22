import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { Info } from "lucide-react";

export default function SurahItem({
  query,
  number,
  name,
  translation,
  numberOfAyahs,
  revelation,
  description,
}: typeSurahList) {
  const highlightQuery = (text: string, query: string) => {
    if (!query) return text; // Jika query kosong, kembalikan teks asli
    const regex = new RegExp(`(${query})`, "gi"); // Membuat regex untuk pencarian yang case-insensitive
    const parts = text.split(regex); // Pisahkan teks berdasarkan query
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-400 rounded-l-md rounded-t-md">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  return (
    <Card className="m-1 transition transform hover:bg-secondary active:bg-primary-foreground hover:scale-95 hover:secondary duration-200 ease-in-out">
      <div className="flex text-sm justify-between ">
        <div className="flex items-start left-0 top-0 w-auto  justify-start ">
          <span className="bg-yellow-400 rounded-t-md rounded-r-md p-1">
            {number}
          </span>
        </div>
        <span className="flex justify-end mx-3">
          <AlertDialog>
            <AlertDialogTrigger className="mt-2 rounded-full hover:scale-125 transition transform duration-200 ease-in-out hover:bg-yellow-400">
              {<Info />}
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-3xl text-yellow-400 font-bold font-serif">
                  {name}
                </AlertDialogTitle>
                <span className=" font-bold pb-2 text-secondary-foreground text-base underline">
                  {translation}
                </span>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </span>
      </div>
      <Link href={`/quran/${number}`}>
        <CardHeader className="py-0 hover:underline">
          <CardDescription className="flex px-3 font-serif justify-start font-bold text-3xl text-primary">
            {highlightQuery(name, query)}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0 font-serif mx-3 text-yellow-400 hover:underline">
          <p>{translation}</p>
        </CardContent>
      </Link>
      <CardFooter className="py-1 flex justify-between text-muted-foreground text-sm">
        <p className="mx-3">{numberOfAyahs} ayat</p>
        <p>{revelation}</p>
      </CardFooter>
    </Card>
  );
}
