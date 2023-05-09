<template>
  <div class="container">
    <div id="service" class="">
      <div class="head">
        <div class="info">
          <i class="fa-solid fa-user"></i>
          <span id="userName" v-if="user">{{ user.userName }}</span>
        </div>
        <div class="tag mb-5">
          <span class="service_name">CHỌN DỊCH VỤ SỬ DỤNG</span>
        </div>
      </div>
      {{ start }}
      {{ stop }}
      {{ timeLine }}
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">SERVICE NAME</th>
            <th scope="col">TOKEN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(serviceItem, index) in listServices" :key="index">
            <input type="radio" v-model="checked" name="check" :value="serviceItem._id" />
            <td>{{ serviceItem.serviceName }}</td>
            <td>{{ serviceItem.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-around">
      <button @click="startService" class="btn btn-success px-5" :disabled="showButton">START</button>
      <button @click="stopService" class="btn btn-danger px-5" :disabled="!showButton">STOP</button>
    </div>
  </div>
  <span v-if="statusService" style="color: red; font-size: 30px; text-align: center"> {{ statusService }}</span>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      serverURL: process.env.VUE_APP_SERVER_URL,
      token: localStorage.getItem("token"),
      listServices: [],
      checked: "",
      statusService: "",
      start: "",
      stop: "",
      timeLine: "",
      showButton: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async startService() {
      this.showButton = true;
      this.statusService = "service running";
      this.start = new Date().getTime();
    },
    async stopService() {
      this.showButton = false;
      this.statusService = "service stoped";
      this.stop = new Date().getTime();
      this.timeLine = new Date().getTime() - this.start;
      setTimeout(() => {
        this.statusService = "";
      }, 2000);
      //call api
      const res = await axios.post(
        `${this.serverURL}/api/wallet/useService`,
        {
          serviceId: this.checked,
          time: this.timeLine,
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      console.log("data res", res.data);
    },
    async getListServices() {
      const listServices = await axios.get(`${this.serverURL}/api/services/list`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.listServices = listServices.data;
      this.checked = this.listServices[0]._id;
    },
  },
  mounted() {
    this.getListServices();
  },
};
</script>
<style>
.container {
  position: relative;
}
#profile {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info {
  margin: 20px;
}
.fa-solid {
  font-size: 18px;
  margin-right: 8px;
  color: rgb(11, 103, 3);
}
#userName {
  font-size: 18px;
  color: #6a5af9;
  transition: 0.25s ease-in-out;
}
.text {
  margin-right: 5px;
  font-weight: 600;
}
input[type="text"] {
  padding: 8px 15px;
  border-radius: 7px;
  border: 1px solid #bdbcbc;
  margin-top: 20px;
}
.service_name {
  padding: 7px 15px;
  border: 1px solid #8b5a5a;
  font-size: 18px;
  border-radius: 7px;
  background-color: rgb(14, 153, 121);
  color: white;
  user-select: none;
}
</style>
