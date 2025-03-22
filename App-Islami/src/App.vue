<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import MainLayout from '@/layout/MainLayout.vue';
import { useApiDataStore } from '@/stores/apiDataStore.js';

const { callAPIs, state } = useApiDataStore();

onMounted(() => {
  callAPIs();
});
</script>

<template>
  <div v-if="state.isLoading">
    Sedang memuat data...
  </div>

  <div v-if="state.isError">
    Error pak
  </div>

  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style scoped></style>
