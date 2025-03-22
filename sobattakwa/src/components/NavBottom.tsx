import { Button } from "./ui/button";
import { ModeToggle } from "./ToggleTheme";
import { HomeIcon, BookOpenText, HandHelping } from "lucide-react";
import Link from "next/link";
export default function NavBottom() {
  return (
    <div className=" w-full fixed bottom-0 left-0 right-0 flex justify-around items-center p-1 backdrop-blur-sm">
      <Link href={"/"}>
        <Button variant="secondary" size="default" className="rounded-xl m-1 ">
          <HomeIcon />
        </Button>
      </Link>
      <Link href={"/quran"}>
        <Button variant="secondary" size="default" className="rounded-xl m-1">
          <BookOpenText />
        </Button>
      </Link>
      <Link href={"/doa"}>
        <Button variant="secondary" size="default" className="rounded-xl m-1">
          <HandHelping />
        </Button>
      </Link>
      <ModeToggle />
    </div>
  );
}
