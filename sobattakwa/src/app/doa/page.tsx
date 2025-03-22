import DoaList from "@/components/Doa/DoaList";
import { getDoa } from "@/lib/utils/fetcher";
// Main component
export default async function Doa() {
  // Fetch Doa data with proper type
  const dataDoa: Doa[] | null = await getDoa();

  // Render component, passing dataDoa to DoaList
  return (
    <main className="w-full flex justify-center items-start min-h-screen mt-5">
      <section className="w-full max-w-3xl flex justify-center items-center flex-col">
        <h1 className="m-2 text-center font-sans font-extrabold text-4xl">
          Do`a <span className="text-yellow-400">Harian</span>
        </h1>
        <div>
          {dataDoa ? <DoaList dataDoa={dataDoa} /> : <p>Failed to load Doa.</p>}
        </div>
      </section>
    </main>
  );
}
