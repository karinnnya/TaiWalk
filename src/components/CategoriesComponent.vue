<template>
  <div class="row g-3">
    <div
      v-for="i in categories"
      :key="i.key"
      class="col-sm-6 col-md-4 col-lg-3"
      type="button"
    >
      <div
        class="h-100 position-relative shadow bg-body shadow bg-body"
        @click="handleClick(i.name)"
        style="border-radius: 25px; overflow: hidden"
      >
        <img :src="i.imgUrl" :alt="i.Picture" style="height: 150px" />
        <div
          class="position-absolute top-50 start-50 translate-middle text-center w-100 h-100"
        >
          <div
            class="d-flex justify-content-center align-items-center h-100 bg-black bg-opacity-50 text-white"
          >
            <h5>{{ i.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(name) {
      this.$emit("category-selected", name);
    },
  },
};
</script>
