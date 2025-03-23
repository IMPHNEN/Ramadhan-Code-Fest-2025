<template>
    <header id="header">
        <nav class="fixed z-10 py-5 md:py-3 bg-gray-800 w-full border-t-2 border-green-500 bottom-0 right-0 left-0 px-0 md:px-5 container mx-auto rounded-t-md">
            <div class="flex justify-between text-xl px-10 font-semibold">
                <router-link to="/" :class="{ 'text-green-400 hover:text-green-500': $route.path === '/' }"
                    class="text-center hover:text-gray-400 duration-100">
                    <i class="fas fa-home"></i>
                    <p class="text-xs md:text-sm hidden md:block">Home</p>
                </router-link>
                <router-link to="/baca-al-quran"
                    :class="{ 'text-green-400 hover:text-green-500': $route.path.match('/baca-al-quran') }"
                    class="text-center hover:text-gray-400 duration-100">
                    <i class="fas fa-quran"></i>
                    <p class="text-xs md:text-sm hidden md:block">Al-Qur'an</p>
                </router-link>
                <router-link to="/asmaul-husna"
                    :class="{ 'text-green-400 hover:text-green-500': $route.path.match('/asmaul-husna') }"
                    class="text-center hover:text-gray-400 duration-100">
                    <i class="fas fa-list"></i>
                    <p class="text-xs md:text-sm hidden md:block">Asma'ul Husna</p>
                </router-link>
                <router-link to="/doa-harian"
                    :class="{ 'text-green-400 hover:text-green-500': $route.path.match('/doa-harian') }"
                    class="text-center hover:text-gray-400 duration-100">
                    <i class="fas fa-praying-hands"></i>
                    <p class="text-xs md:text-sm hidden md:block">Do'a Harian</p>
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script setup>

</script>

<style scoped></style>