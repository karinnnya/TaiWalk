import { defineStore } from "pinia";
import axios from "axios";
const url = 'https://tdx.transportdata.tw/api/basic/v2/Tourism';

export default defineStore("datasStore", {
  state: () => {
    return {
      datas: [],
    };
  },

  actions: {
    getActivitys(city) {

      if (city) {
        return axios
          .get(
            `${url}/Activity/${city}?$format=JSON`
          )
          .then((res) => {
            this.datas = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        return axios
          .get(
            `${url}/Activity?$format=JSON`
          )
          .then((res) => {
            this.datas = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }


    },
    getAttractions(city) {
      if (city) {
        return axios
          .get(
            `${url}/ScenicSpot/${city}?$format=JSON`
          )
          .then((res) => {
            this.datas = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        return axios
          .get(
            `${url}/ScenicSpot?$format=JSON`
          )
          .then((res) => {
            this.datas = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }


    },
    getFood(city) {

      if (city) {
        return axios
          .get(
            `${url}/Restaurant/${city}?$format=JSON`
          )
          .then((res) => {
            this.datas = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        return axios
          .get(
            `${url}/Restaurant?$format=JSON`
          )
          .then((res) => {
            this.datas = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }

    },
  },
});
