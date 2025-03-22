interface Audio {
  alafasy: string;
  ahmedajamy: string;
  husarymujawwad: string;
  minshawi: string;
  muhammadayyoub: string;
  muhammadjibreel: string;
}

interface Bismillah {
  arab: string;
  translation: string;
  audio: Audio;
}

interface AyahNumber {
  inQuran: number;
  inSurah: number;
}

interface Image {
  primary: string;
  secondary: string;
}

interface Tafsir {
  short: string;
  long: string;
}

interface TafsirCollection {
  kemenag: Tafsir;
  quraish: string;
  jalalayn: string;
}

interface AyahMeta {
  juz: number;
  page: number;
  manzil: number;
  ruku: number;
  hizbQuarter: number;
  sajda: {
    recommended: boolean;
    obligatory: boolean;
  };
}

interface Ayah {
  number: AyahNumber;
  arab: string;
  translation: string;
  audio: Audio;
  image: Image;
  tafsir: TafsirCollection;
  meta: AyahMeta;
}

interface Surah {
  number: number;
  numberOfAyahs: number;
  name: string;
  translation: string;
  revelation: string;
  description: string;
  audio: string;
  bismillah: Bismillah;
  ayahs: Ayah[];
}
