<template>
  <div class="row g-4">
    <div
      v-for="i in datas"
      :key="i.key"
      class="col-sm-6 col-lg-3"
      role="button"
      @click="openDatas(i)"
    >
      <div
        class="shadow bg-body"
        style="border-radius: 25px; height: 200px; overflow: hidden"
      >
        <div class="hoverImg" v-if="i.Picture.PictureUrl1">
          <img
            class="mb-2"
            :src="i.Picture.PictureUrl1"
            :alt="i.Picture"
            style="border-radius: 25px; height: 200px; overflow: hidden"
          />
        </div>
        <img
          class="mb-2"
          src="../assets/images/NoImage-255x200.png"
          alt="noimg"
          style="border-radius: 25px; height: 200px"
          v-else
        />
      </div>
      <h5 class="pt-2 ps-3 text-truncate">{{ i.ScenicSpotName }}</h5>
      <div class="d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-geo-alt-fill text-secondary me-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
          />
        </svg>
        <p class="text-truncate">{{ i.Address }}</p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade productInfo"
    ref="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ selectedData.ScenicSpotName }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div>
          <div>
            <div style="height: 400px">
              <img
                :src="selectedData.Picture?.PictureUrl1"
                class="card-img-top primary-image"
                alt="主圖"
                v-if="selectedData.Picture?.PictureUrl1"
              />
              <img
                src="../assets/images/NoImage-255x200.png"
                alt="noimg"
                v-else
              />
            </div>
            <div class="p-4">
              <h3 class="card-title mt-1 mb-2 text-primary">
                {{ selectedData.ScenicSpotName }}
              </h3>

              <h5 v-show="selectedData.Class1 !== undefined">
                <span
                  class="border border-success rounded-pill text-success ps-3 pe-3"
                >
                  #{{ selectedData.Class1 }}
                </span>
              </h5>
              <p class="pt-2 fs-5">景點介紹：</p>
              <p class="lh-lg">
                {{ selectedData.DescriptionDetail }}
              </p>

              <div class="d-flex pt-4">
                <div class="bg-dark bg-opacity-10 p-4 me-4 w-50 rounded">
                  <p>開放時間： {{ selectedData.OpenTime }}</p>
                  <p>服務電話： {{ selectedData.Phone }}</p>
                  <p>景點地址： {{ selectedData.Address }}</p>
                  <p v-show="selectedData.TicketInfo !== undefined">
                    票價資訊： {{ selectedData.TicketInfo }}
                  </p>
                  <p v-show="selectedData.Remarks !== undefined">
                    注意事項： {{ selectedData.Remarks }}
                  </p>
                </div>
                <div
                  class="w-50"
                  v-show="selectedData.TravelInfo !== undefined"
                >
                  <h5>交通資訊：</h5>
                  <p>{{ selectedData.TravelInfo }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "../mixin/modalMixin";

export default {
  data() {
    return {
      selectedData: {},
    };
  },
  props: {
    datas: {
      type: Array,
      required: true,
    },
  },
  mixins: [modalMixin],

  methods: {
    openDatas(i) {
      this.selectedData = i;
      this.modal.show();
    },
  },
};
</script>
