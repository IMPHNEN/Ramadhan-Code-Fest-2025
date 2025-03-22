<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import HeaderContent from '@/components/HeaderContent.vue';
import { useApiDataStore } from '@/stores/apiDataStore.js';

const { state } = useApiDataStore();

const listItem = state.doaHarian;
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
    const list = document.getElementById("list");
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
</script>

<template>
    <div>
        <HeaderContent img="doa-harian" text-title="Do'a Harian">
            <p class="mb-2">"Berdoalah kepada Allah dan yakinlah bahwa doa kalian akan dikabulkan. Ketahuilah bahwa
                Allah
                tidak mengabulkan doa dari hati yang lalai dan tidak bersungguh-sungguh."</p>
            <div class="flex justify-center gap-x-3 mt-7">
                <input type="text" placeholder="Cari..." name="" id="search"
                    class="border-[3.5px] border-gray-500 focus:outline-none focus:border-green-500 rounded-xl p-2.5 text-gray-800 w-full md:w-[30rem] font-medium placeholder:font-medium block"
                    ref="textInput" autocomplete="off">
            </div>
        </HeaderContent>

        <div class="mt-14 md:mt-20 mb-56" id="list">
            <div v-for="item in listItem" :key="item.urutan"
                class="p-6 border-2 border-green-500 rounded-lg w-full hover:bg-green-500 hover:bg-opacity-10 duration-300 mb-5 item">
                <span class="text-xl text-start block font-semibold mb-5">{{ item.urutan }}. {{ item.namaDoa
                    }}</span>
                <h5 class="text-end text-3xl font-scheherazade-regular font-semibold block mb-3 leading-loose">{{ item.arab }}</h5>
                <div class="text-sm">
                    <span class="text-start block font-medium leading-5">{{ item.arti }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>