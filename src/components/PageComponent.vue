<template>
  <div class="pagination justify-content-center mt-5">
    <button
      type="button"
      class="page-link"
      :disabled="currentPage === 1"
      @click="handlePageClick('prev')"
    >
      上一頁
    </button>
    <button
      type="button"
      class="page-link"
      v-for="pageNumber in pageNumbers"
      :key="pageNumber"
      :class="{ active: currentPage === pageNumber }"
      @click="handlePageClick(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button
      type="button"
      class="page-link"
      :disabled="currentPage === pageCount"
      @click="handlePageClick('next')"
    >
      下一頁
    </button>

    <span class="mt-1 ms-2">共 {{ pageCount }} 頁</span>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    pageNumbers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handlePageClick(pageNumber) {
      this.$emit("page-clicked", pageNumber);
    },
  },
};
</script>
