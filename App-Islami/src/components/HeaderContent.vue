<script setup>
defineProps({
    img: String,
    textTitle: String,
})
</script>

<template>
    <img :src="`/img/${img}.png`" class="w-20 inline-block" alt="" srcset="">
    <h1 class="text-4xl font-semibold my-4">{{ textTitle }}</h1>
    <slot></slot>
    <div class="flex justify-center items-center gap-2 mt-6">
        <div class="py-0.5 px-2.5 text-xs bg-green-500 bg-opacity-30 border border-green-500 font-semibold rounded-md">
            Ctrl</div>
        <i class="fas fa-plus text-xs"></i>
        <div class="py-0.5 px-2.5 text-xs bg-green-500 bg-opacity-30 border border-green-500 font-semibold rounded-md">
            K</div>
    </div>
</template>

<style scoped></style>