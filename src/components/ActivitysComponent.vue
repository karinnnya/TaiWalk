<template>
  <div v-for="i in datas" :key="i.id" :class="columnClass">
    <div
      class="border shadow"
      style="border-radius: 25px; overflow: hidden; height: 200px"
    >
      <div class="row h-100">
        <div class="col-5">
          <img
            :src="i.Picture.PictureUrl1"
            :alt="i.Picture"
            v-if="i.Picture.PictureUrl1"
          />

          <img src="../assets/images/NoImage-255x200.png" alt="noimg" v-else />
        </div>

        <div class="p-3 col-7">
          <h5 class="text-truncate">{{ i.ActivityName }}</h5>
          <p>{{ formatDate(i.StartTime) }} - {{ formatDate(i.EndTime) }}</p>
          <div>
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
            <p role="button" @click="openDatas(i)">詳細介紹</p>
          </div>
        </div>
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
            {{ selectedData.ActivityName }}
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
                {{ selectedData.ActivityName }}
              </h3>
              <h5 v-show="selectedData.Class1 !== undefined">
                <span
                  class="border border-success border-primary rounded-pill text-success ps-3 pe-3"
                >
                  #{{ selectedData.Class1 }}
                </span>
              </h5>
              <p class="pt-2 fs-5">活動介紹：</p>
              <p class="lh-lg">
                {{ selectedData }}

                {{ selectedData.Description }}
              </p>

              <div class="bg-dark bg-opacity-10 p-4 me-4 rounded">
                <p>
                  活動時間： {{ formatDate(selectedData.StartTime) }} -
                  {{ formatDate(selectedData.EndTime) }}
                </p>
                <p>活動地點：{{ selectedData.Location }}</p>

                <p>活動地址： {{ selectedData.Address }}</p>
                <p>主辦單位：{{ selectedData.Organizer }}</p>
                <p>聯絡電話： {{ selectedData.Phone }}</p>

                <p v-show="selectedData.TicketInfo !== undefined">
                  活動票價： {{ selectedData.TicketInfo }}
                </p>
                <p v-show="selectedData.WebsiteUrl !== undefined">
                  活動網站： {{ selectedData.WebsiteUrl }}
                </p>
                <p v-show="selectedData.Remarks !== undefined">
                  注意事項： {{ selectedData.Remarks }}
                </p>
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
    columnClass: {
      type: String,
      required: true,
    },
  },
  mixins: [modalMixin],

  methods: {
    openDatas(i) {
      this.selectedData = i;
      this.modal.show();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },
};
</script>
