<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import HeaderContent from '@/components/HeaderContent.vue';
import { useApiDataStore } from '@/stores/apiDataStore.js';

const { state } = useApiDataStore();

const terakhirBaca = ref(localStorage.getItem('terakhir-baca'));
const anchorAyat = ref(localStorage.getItem('anchor-ayat'));

const listSurah = state.surah;
const textInput = ref(null);

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (event => {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        textInput.value.focus();
    }
});

const setupSearch = () => {
    const inputElement = document.getElementById("search");
    const list = document.getElementById("list-surah");
    const itemLists = list.getElementsByClassName("item");

    inputElement.addEventListener("input", function () {
        const searchText = inputElement.value.toLowerCase();
        for (const item of itemLists) {
            const listItemText = item.textContent.toLowerCase();
            if (listItemText.includes(searchText)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });
};

onMounted(() => {
    setupSearch();
});

const clearBookmark = computed(() => {
    localStorage.setItem('terakhir-baca', '');
    window.location.reload();
});
</script>
<template>
    <div>
        <HeaderContent img="al-quran" text-title="Baca Al-Qur'an">
            <p class="mb-2">"Sesungguhnya Allah tidak melihat fisik <br class="hidden md:block">dan harta kalian
                tetapi ia melihat hati dan amal kalian."</p>
            <div class="flex justify-center gap-x-3 mt-7">
                <input type="text" placeholder="Cari surah..." name="" id="search"
                    class="border-[3.5px] border-gray-500 focus:outline-none focus:border-green-500 rounded-xl p-2.5 text-gray-800 w-full md:w-[30rem] font-medium placeholder:font-medium block"
                    ref="textInput" autocomplete="off">
            </div>
        </HeaderContent>

        <div class="flex justify-center flex-col items-center gap-2 mt-6" v-if="terakhirBaca">
            <div>
                Terakhir dibaca: <a :href="'/baca-al-quran/surah/' + anchorAyat"
                    class="text-green-500 hover:no-underline underline">{{ terakhirBaca
                    }}</a>
            </div>
            <button @click="clearBookmark()"
                class="py-2 px-3 bg-green-500 hover:bg-green-600 duration-300 rounded-lg text-sm"><i
                    class="fas fa-trash"></i></button>
        </div>

        <div class="mt-14 md:mt-20 mb-56">
            <div class="flex flex-wrap justify-normal md:justify-around gap-7" id="list-surah">
                <a :href="'/baca-al-quran/surah/' + item.nomor"
                    class="p-3 border-2 border-green-500 rounded-lg w-full md:w-72 hover:bg-green-500 hover:bg-opacity-10 duration-300 item"
                    v-for="item in listSurah" :key="item.nomor">
                    <span class="text-xs text-end block font-medium">{{ item.tempatTurun }} ({{ item.tempatTurun ==
                        'Mekah' ? 'Makkiyyah' : 'Madaniyyah' }})</span>
                    <h5 class="text-start text-xl font-semibold block">{{ item.nomor }}. {{ item.namaLatin }}</h5>
                    <span class="text-end block text-3xl font-scheherazade-regular">{{ item.nama }}</span>
                    <div class="text-sm">
                        <span class="text-start block font-semibold">{{ item.arti }}</span>
                        <span class="text-start block">Jumlah ayat: {{ item.jumlahAyat }}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>