<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <section id="content">
    <div class="px-3 md:px-10 container mx-auto h-auto flex justify-center mt-32 md:mt-20 text-center">
      <Transition name="fade">
        <slot></slot>
      </Transition>
    </div>
  </section>
  <Navbar></Navbar>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>