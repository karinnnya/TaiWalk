<template>
  <div class="row gy-2 mb-3">
    <div class="col-12 col-lg-2">
      <CityComponent @city-change="handleCityChange" />
    </div>
    <div class="col-12 col-lg-2">
      <select class="form-select" v-model="selectedValue">
        <option value="">全部種類</option>
        <option :value="i.value" v-for="i in categories" :key="i.name">
          {{ i.name }}
        </option>
      </select>
    </div>
    <div class="col-12 col-lg-6">
      <input
        class="border rounded bg-light fs-5 px-3 py-1 w-100"
        type="text"
        placeholder="你想去哪裡？請輸入關鍵字"
        v-model.trim="keyword"
      />
    </div>
    <div class="col-12 col-lg-2">
      <button
        type="button"
        class="btn btn-primary fs-5 text-white w-100"
        @click="searchDatas(this.selectedValue)"
      >
        搜 尋
      </button>
    </div>
  </div>
  <div v-if="!search">
    <h3>熱門主題</h3>
    <CategoriesComponent
      :categories="categories"
      @category-selected="searchDatas"
    />
  </div>

  <div v-else>
    <h3>
      搜尋結果
      <span class="fs-6">共 {{ filteredDatasCache.length }} 筆資料</span>
    </h3>
    <div class="row mt-3" v-if="paginatedDatas.length > 0">
      <FoodsComponent :datas="paginatedDatas" />
      <PageComponent
        :currentPage="currentPage"
        :pageCount="pageCount"
        :pageNumbers="pageNumbers"
        @page-clicked="handlePageClick"
      />
    </div>
    <div class="text-center mt-4" v-else>
      <img
        src="../assets/images/nofound80.png"
        alt="nofound80"
        style="width: 100px; margin: 0 auto"
      />
      <h5 class="mt-3">
        目前查無資料 <br />
        請重新搜尋
      </h5>
    </div>
  </div>
</template>

<style></style>

<script>
// import axios from "axios";
import CityComponent from "@/components/CityComponent.vue";
import PageComponent from "@/components/PageComponent.vue";
import FoodsComponent from "@/components/FoodsComponent.vue";

import CategoriesComponent from "@/components/CategoriesComponent.vue";

import datasStore from "../stores/datasStore.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      paginatedDatas: [],
      filteredDatasCache: [],
      search: false,
      selectedCategory: "",
      selectedCity: "",
      selectedValue: "",
      selectedData: "",
      keyword: "",
      onePage: 20,
      currentPage: 1,
      categories: [
        {
          name: "地方特產",
          imgUrl:
            "https://images.unsplash.com/photo-1589553288887-3ee1f709e119?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=ˋㄢ&q=80",
          value: "地方特產",
        },
        {
          name: "中式美食",
          imgUrl:
            "https://images.unsplash.com/photo-1551851300-1fd39219a668?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=ˋ400&q=80",
          value: "中式美食",
        },
        {
          name: "異國料理",
          imgUrl:
            "https://images.unsplash.com/photo-1611171711791-b34fa42e9fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
          value: "異國料理",
        },
        {
          name: "素食",
          imgUrl:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          value: "素食",
        },
        {
          name: "甜點冰品",
          imgUrl:
            "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          value: "甜點冰品",
        },
        {
          name: "伴手禮",
          imgUrl:
            "https://plus.unsplash.com/premium_photo-1664474816376-408f8ba74be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          value: "伴手禮",
        },
      ],
    };
  },
  components: {
    CityComponent,
    PageComponent,
    FoodsComponent,
    CategoriesComponent,
  },

  computed: {
    ...mapState(datasStore, ["datas"]),
    pageCount() {
      return Math.ceil(this.filteredDatas().length / this.onePage);
    },
    pageNumbers() {
      const totalPageNumbers = Math.min(this.pageCount, 10); // 顯示的頁碼數量
      const pageNumbers = [];

      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(totalPageNumbers / 2)
      );
      const endPage = Math.min(
        this.pageCount,
        startPage + totalPageNumbers - 1
      );

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    },
  },
  methods: {
    ...mapActions(datasStore, ["getFood"]),

    filteredDatas() {
      let datas = [...this.datas];

      if (this.selectedCategory) {
        datas = datas.filter((datas) => datas.Class === this.selectedCategory);
        this.currentPage = 1;
      }
      if (this.keyword) {
        datas = datas.filter((datas) =>
          datas.RestaurantName.includes(this.keyword)
        );
        this.currentPage = 1;
      }
      return datas;
    },

    handlePageClick(pageNumber) {
      if (pageNumber === "prev" && this.currentPage > 1) {
        this.currentPage--;
      } else if (pageNumber === "next" && this.currentPage < this.pageCount) {
        this.currentPage++;
      } else {
        this.currentPage = pageNumber;
      }
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
      this.updatePaginatedDatas();
    },
    handleCityChange(i) {
      this.selectedCity = i;
    },

    async searchDatas(i) {
      this.search = true;
      this.currentPage = 1;
      this.selectedCategory = i;

      if (this.selectedCity) {
        await this.getFood(this.selectedCity);

        this.filteredDatasCache = this.filteredDatas();
        this.updatePaginatedDatas();
      } else {
        await this.getFood();

        this.filteredDatasCache = this.filteredDatas();
        this.updatePaginatedDatas();
      }
    },
    updatePaginatedDatas() {
      const startIndex = (this.currentPage - 1) * this.onePage;
      const endIndex = startIndex + this.onePage;

      this.paginatedDatas = this.filteredDatasCache.slice(startIndex, endIndex);
    },
  },
  mounted() {
    if (this.$route.query.keyword !== undefined) {
      this.searchDatas();
    }
  },
};
</script>
