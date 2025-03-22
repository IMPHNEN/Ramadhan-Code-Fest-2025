import DetailSurahList from "@/components/Surah/DetailSurahList";
import { UrlSurah } from "@/lib/utils/fetcher";

async function fetchDetail(slug: string): Promise<Surah | null> {
  try {
    const response = await fetch(`${UrlSurah}/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch detail: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching detail:", error);
    return null;
  }
}
export default async function detailSurah({
  params,
}: {
  params: { slug: string };
}) {
  const detailSurah: Surah | null = await fetchDetail(params.slug);
  if (!detailSurah) {
    return <p>Error loading details. Please try again later.</p>;
  }
  return (
    <div>
      {detailSurah ? (
        <DetailSurahList detailSurah={detailSurah} />
      ) : (
        <p>Failed to load..</p>
      )}
    </div>
  );
}
