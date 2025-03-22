import "./assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import { useApiDataStore } from "@/stores/apiDataStore.js";

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia);

const apiDataStore = useApiDataStore();
apiDataStore.callAPIs();

app.mount("#app");
