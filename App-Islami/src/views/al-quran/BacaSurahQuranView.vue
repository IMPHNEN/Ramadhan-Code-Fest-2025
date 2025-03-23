<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pathURL = ref(window.location.pathname.match(/\/surah\/(\d+)/));
const surah = ref([]);

const isLatin = ref([false]);
const isAudio = ref([false]);

onMounted(async () => {
    try {
        const response = await axios.get(`https://equran.id/api/v2/surat/${pathURL.value[1]}`);
        surah.value = response.data.data;
    } catch (error) {
        window.location.href = '/error';
    }
});

const showTafsirAlert = (namaSurah, deskripsi) => {
    Swal.fire({
        title: `Tafsir surah ${namaSurah}`,
        html: deskripsi,
        icon: 'info',
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#00DC82',
    });
};

const bookmarkAyat = (nomorSurah, surah, ayat) => {
    Swal.fire({
        title: `Sukses menandai<br> surah ${surah} ayat ${ayat}`,
        icon: 'success',
        confirmButtonText: 'Oke',
        confirmButtonColor: '#00DC82',
    });

    localStorage.setItem('terakhir-baca', `${surah} ayat ${ayat}`);
    localStorage.setItem('anchor-ayat', `${nomorSurah}#${ayat}`);
};
</script>

<template>
    <div>
        <h2 class="text-4xl font-semibold my-2 font-scheherazade-regular">{{ surah.nama }}</h2>
        <h1 class="mb-1 text-4xl font-extrabold ">{{ surah.namaLatin }}</h1>
        <span class="font-semibold text-lg mb-7">{{ surah.arti }}. Surah ke-{{ surah.nomor }}. {{ surah.tempatTurun
            ==
            'Mekah' ? 'Makkiyyah' : 'Madaniyyah' }}</span>
        <div class="flex justify-center items-center gap-5 mt-7 font-semibold">
            <div @click="isAudio = !isAudio" class="flex items-center gap-2 cursor-pointer hover:text-green-500"
                :class="{ 'text-green-500': !isAudio }">
                <i class="fas fa-volume-up"></i>
                <span>Audio</span>
            </div>
            <div @click="isLatin = !isLatin" class="flex items-center gap-2 cursor-pointer hover:text-green-500"
                :class="{ 'text-green-500': !isLatin }">
                <i class="fas fa-spell-check"></i>
                <span>Latin</span>
            </div>
            <div @click="showTafsirAlert(surah.namaLatin, surah.deskripsi)"
                class="flex items-center gap-2 cursor-pointer hover:text-green-500">
                <i class="fas fa-book"></i>
                <span>Tafsir</span>
            </div>
        </div>
        <div class="flex justify-between mt-7">
            <a :class="{ 'invisible': surah.nomor == 1 }" :href="'/baca-al-quran/surah/' + (surah.nomor - 1)"
                class="p-2 rounded-md text-sm font-medium border-2 border-green-500 hover:bg-green-400 hover:bg-opacity-15"><i
                    class="fas fa-chevron-left"></i> Sebelumnya
            </a>
            <a :class="{ 'invisible': surah.nomor == 114 }" :href="'/baca-al-quran/surah/' + (surah.nomor + 1)"
                class="p-2 rounded-md text-sm font-medium border-2 border-green-500 hover:bg-green-400 hover:bg-opacity-15">Selanjutnya
                <i class="fas fa-chevron-right"></i></a>
        </div>
        <div class="mt-14 md:mt-20 mb-56 w-full md:w-[60rem]">
            <div v-for="  ayat in surah.ayat  " :key="ayat.nomorAyat" class="mb-6 border-b-2 border-green-500"
                :id="ayat.nomorAyat">
                <div
                    class="rounded-full bg-green-500 w-10 h-10 text-lg font-bold flex items-center justify-center mb-5">
                    {{
                        ayat.nomorAyat }}
                </div>
                <h2 class="text-end text-4xl block font-scheherazade-regular leading-loose">{{ ayat.teksArab }}</h2>
                <p class="text-end block italic text-green-500 mt-3" :class="{ 'hidden': isLatin }">{{ ayat.teksLatin
                    }}
                </p>
                <p class="text-start mt-3 mb-3">{{ ayat.teksIndonesia }}</p>
                <audio controls :class="{ 'hidden': isAudio }">
                    <source :src="ayat.audio['01']" type="audio/mpeg">
                </audio>
                <div class="flex justify-end mt-3 mb-5">
                    <button @click="bookmarkAyat(surah.nomor, surah.namaLatin, ayat.nomorAyat)"
                        class="p-1 rounded-md text-xs font-medium border-2 border-green-500 hover:bg-green-400 hover:bg-opacity-15">Tandai
                        ayat</button>
                </div>
            </div>
            <div class="flex justify-between mt-7">
                <a :class="{ 'invisible': surah.nomor == 1 }" :href="'/baca-al-quran/surah/' + (surah.nomor - 1)"
                    class="p-2 rounded-md text-sm font-medium border-2 border-green-500 hover:bg-green-400 hover:bg-opacity-15"><i
                        class="fas fa-chevron-left"></i> Sebelumnya
                </a>
                <a :class="{ 'invisible': surah.nomor == 114 }" :href="'/baca-al-quran/surah/' + (surah.nomor + 1)"
                    class="p-2 rounded-md text-sm font-medium border-2 border-green-500 hover:bg-green-400 hover:bg-opacity-15">Selanjutnya
                    <i class="fas fa-chevron-right"></i></a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>