import { defineStore } from "pinia";
import axios from "axios";
import { reactive } from "vue";

export const useApiDataStore = defineStore("apiDataStore", () => {
  const state = reactive ({
    surah: null,
    asmaulHusna: null,
    doaHarian: null,
    sholatWajib: null,
    sholatSunnah: null,
    isLoading: false,
    isError: false,
  });

  async function callAPIs() {
    state.isLoading = true;
    try {
      const resSurah = await axios.get("https://equran.id/api/v2/surat");
      state.surah = resSurah.data.data;

      const resAsmaulHusna = await axios.get(
        "https://islami-api.vercel.app/api/asmaul-husna/all"
      );
      state.asmaulHusna = resAsmaulHusna.data.data;

      const resDoaHarian = await axios.get(
        "https://islami-api.vercel.app/api/doa-harian"
      );
      state.doaHarian = resDoaHarian.data.data;

      const resSholatWajib = await axios.get(
        "https://islami-api.vercel.app/api/niat-sholat-wajib/all"
      );
      state.sholatWajib = resSholatWajib.data.data;

      const resSholatSunnah = await axios.get(
        "https://islami-api.vercel.app/api/niat-sholat-sunnah/all"
      );
      state.sholatSunnah = resSholatSunnah.data.data;
    } catch (error) {
      state.isError = true;
      console.log(error);
    } finally {
      state.isLoading = false;
    }
  }

  return { state, callAPIs };
});
