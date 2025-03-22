import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AsmaulHusnaView from "@/views/asmaul-husna/AsmaulHusnaView.vue";
import BacaAlQuranView from "@/views/al-quran/BacaAlQuranView.vue";
import BacaSurahQuranView from "@/views/al-quran/BacaSurahQuranView.vue";
import DoaHarianView from "@/views/doa/DoaHarianView.vue";
import ErrorView from "@/views/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ?? '/'),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "Home - App Islami",
      },
    },
    {
      path: "/asmaul-husna",
      name: "Asma'ul Husna",
      component: AsmaulHusnaView,
      meta: {
        title: "Asma'ul Husna - App Islami",
      },
    },
    {
      path: "/baca-al-quran",
      name: "Baca Al-Qur'an",
      component: BacaAlQuranView,
      meta: {
        title: "Baca Al-Qur'an - App Islami",
      },
    },
    {
      path: "/doa-harian",
      name: "Do'a Harian",
      component: DoaHarianView,
      meta: {
        title: "Do'a Harian - App Islami",
      },
    },
    {
      path: "/baca-al-quran/surah/:id",
      name: "Al-Fatihah",
      component: BacaSurahQuranView,
    },
    {
      path: "/error",
      name: "404 Not Found",
      component: ErrorView,
      meta: {
        title: "404 Not Found - App Islami",
      },
    },
    { path: "/:pathMatch(.*)", redirect: "/error" },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "App Islami";
  next();
});

export default router;
