<script>
import { RouterView } from "vue-router";
import NaverComponent from "@/components/NaverComponent.vue";

export default {
  components: {
    RouterView,
    NaverComponent,
  },
};
</script>

<template>
  <NaverComponent />
  <div class="container mt-5" style="padding-bottom: 200px">
    <RouterView />
  </div>

  <footer
    class="bg-primary p-4 text-center text-white position-absolute bottom-0 w-100"
  >
    <p>© Copyright 2021 The F2E 3rd</p>
    <p>資料來源：運輸資料流通服務平臺 (TDX)</p>
  </footer>
</template>

<style lang="scss">
@import "@/assets/all.scss";
</style>
