<template>
  <div style="max-width: 1000px; margin: 0 auto">
    <div class="row mb-4 pt-5 pb-5">
      <div class="col-12 col-md-6 text-primary">
        <h1 style="line-height: 3.75rem">
          探索
          <span class="border-bottom border-secondary border-3">台灣之美</span>
          <br />
          讓我們更親近這片土地
        </h1>
        <div class="d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-geo-alt-fill text-secondary"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            />
          </svg>
          <h5>台灣旅遊景點導覽 Taiwan Travel Guide</h5>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <select class="form-select mb-2" v-model="type">
          <option value="attractions">探索景點</option>
          <option value="activitys">節慶活動</option>
          <option value="foods">品嘗美食</option>
        </select>
        <input
          type="text"
          class="form-control mb-2"
          placeholder="你想去哪裡？請輸入關鍵字"
          v-model.trim="keyword"
        />
        <button
          class="btn w-100 btn-primary text-white"
          type="button"
          @click="goSearch"
        >
          搜尋
        </button>
      </div>
    </div>

    <swiper
      class="mySwiper mb-5"
      style="border-radius: 25px; height: 500px"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :loop="true"
      :modules="modules"
    >
      <swiper-slide
        ><img
          src="https://images.unsplash.com/photo-1571474004502-c1def214ac6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://images.unsplash.com/photo-1609147110688-83b5fd1288e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://images.unsplash.com/photo-1621848296279-7751546e9acc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1190&q=80"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          src="https://images.unsplash.com/photo-1583889659384-64d9df2347ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
      /></swiper-slide>
    </swiper>

    <div class="mb-5">
      <div class="d-flex justify-content-between align-items-center">
        <h2>近期活動</h2>
        <router-link class="text-info" to="/activitys"
          >查看更多活動＞</router-link
        >
      </div>
      <div class="row g-3">
        <ActivitysComponent :datas="activitys" columnClass="col-12 col-lg-6" />
      </div>
    </div>

    <div class="mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h2>熱門打卡景點</h2>

        <router-link class="text-info d-flex" to="/attractions">
          <p>查看更多景點＞</p>
        </router-link>
      </div>

      <AttractionsComponent :datas="RandomAttractions" />
    </div>
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <h2>一再回訪美食</h2>
        <router-link class="text-info d-flex" to="/foods">
          <p>查看更多美食＞</p>
        </router-link>
      </div>
      <FoodsComponent :datas="RandomFoods" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/vue";
import AttractionsComponent from "@/components/AttractionsComponent.vue";
import ActivitysComponent from "@/components/ActivitysComponent.vue";
import FoodsComponent from "@/components/FoodsComponent.vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

export default {
  data() {
    return {
      type: "attractions",
      activitys: [],
      attractions: [],
      foods: [],
      RandomAttractions: [],
      RandomFoods: [],
      keyword: "",

      // autoplayOptions: {
      //   delay: 1500,
      //   disableOnInteraction: false,
      // },
    };
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    AttractionsComponent,
    ActivitysComponent,
    FoodsComponent,
  },

  computed: {},
  methods: {
    getActivitys() {
      return axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=4&%24format=JSON`
        )
        .then((res) => {
          this.activitys = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAttractions() {
      return axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON
`
        )
        .then((res) => {
          this.attractions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFoods() {
      return axios
        .get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=20&%24format=JSON`
        )
        .then((res) => {
          this.foods = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goSearch() {
      const routePath = `/${this.type}`;
      const query = { keyword: this.keyword };

      this.$router.push({ path: routePath, query });
    },

    async getRandomAttractions() {
      await this.getAttractions();
      this.RandomAttractions = [];
      const randomIndexSet = new Set();
      while (randomIndexSet.size < 4) {
        randomIndexSet.add(Math.floor(Math.random() * this.attractions.length));
      }
      // randomIndexSet.forEach((randomIndex) => {
      //   const attraction = this.attractions[randomIndex];
      //   if (attraction.Picture?.PictureUrl1) {
      //     this.RandomAttractions.push(attraction);
      //   }
      // });

      randomIndexSet.forEach((randomIndex) => {
        this.RandomAttractions.push(this.attractions[randomIndex]);
      });
    },

    async getRandomFoods() {
      await this.getFoods();
      this.RandomFoods = [];
      const randomIndexSet = new Set();
      while (randomIndexSet.size < 4) {
        randomIndexSet.add(Math.floor(Math.random() * this.foods.length));
      }
      randomIndexSet.forEach((randomIndex) => {
        const food = this.foods[randomIndex];
        if (food.Picture?.PictureUrl1) {
          this.RandomFoods.push(food);
        }
      });
    },
  },
  mounted() {
    this.getActivitys();
    this.getRandomAttractions();
    this.getRandomFoods();
  },
};
</script>
