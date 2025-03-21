<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import HeaderContent from '@/components/HeaderContent.vue';
import { useApiDataStore } from '@/stores/apiDataStore.js';

const { state } = useApiDataStore();

const listItem = state.asmaulHusna;
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
        <HeaderContent img="asmaul-husna" text-title="Asma'ul Husna">
            <p class="mb-2">"Sesunguhnya Allah memiliki 99 nama, seratus kurang satu,<br class="hidden md:block">siapa
                yang
                menjaganya maka dia masuk surga."
            </p>
            <div class="flex justify-center gap-x-3 mt-7">
                <input type="text" placeholder="Cari..." name="" id="search"
                    class="border-[3.5px] border-gray-500 focus:outline-none focus:border-green-500 rounded-xl p-2.5 text-gray-800 w-full md:w-[30rem] font-medium placeholder:font-medium block"
                    ref="textInput" autocomplete="off">
            </div>
        </HeaderContent>

        <div class="mt-14 md:mt-20 mb-56">
            <div class="flex flex-wrap justify-normal md:justify-around gap-7" id="list">
                <div v-for="item in listItem" :key="item.urutan"
                    class="p-5 border-2 border-green-500 rounded-lg w-full md:w-72 hover:bg-green-500 hover:bg-opacity-10 duration-300 item">
                    <span class="text-2xl text-start block font-semibold">{{ item.urutan }}.</span>
                    <h5 class="text-end text-4xl font-scheherazade-regular font-semibold block">{{ item.arab }}</h5>
                    <span class="text-start block text-xl font-semibold mr-3">{{ item.latin }}</span>
                    <div class="text-xs">
                        <span class="text-start block font-medium">{{ item.artinya }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>