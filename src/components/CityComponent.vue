<template>
  <select class="form-select" v-model="selectedCity" @change="handleCityChange">
    <option :value="city.value" v-for="city in cities" :key="city.name">
      {{ city.name }}
    </option>
  </select>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      cities: [
        { name: "全部縣市", value: "" },
        { name: "基隆市", value: "Keelung" },
        { name: "台北市", value: "Taipei" },
        { name: "新北市", value: "NewTaipei" },
        { name: "桃園市", value: "Taoyuan" },
        { name: "新竹縣", value: "HsinchuCounty" },
        { name: "新竹市", value: "Hsinchu" },
        { name: "苗栗縣", value: "MiaoliCounty" },
        { name: "台中市", value: "Taichung" },
        { name: "彰化縣", value: "ChanghuaCounty" },
        { name: "雲林縣", value: "YunlinCounty" },
        { name: "南投縣", value: "NantouCounty" },
        { name: "嘉義縣", value: "ChiayiCounty" },
        { name: "嘉義市", value: "Chiayi" },
        { name: "台南市", value: "Tainan" },
        { name: "高雄市", value: "Kaohsiung" },
        { name: "屏東縣", value: "PingtungCounty" },
        { name: "台東縣", value: "TaitungCounty" },
        { name: "花蓮縣", value: "HualienCounty" },
        { name: "宜蘭縣", value: "YilanCounty" },
        { name: "澎湖縣", value: "PenghuCounty" },
        { name: "金門縣", value: "KinmenCounty" },
        { name: "連江縣", value: "LienchiangCounty" },
      ],
      selectedCity: "",
    };
  },
  computed: {},
  emits: ["city-change"],
  methods: {
    handleCityChange() {
      this.$emit("city-change", this.selectedCity);
    },
  },
  mounted() {},
};
</script>
