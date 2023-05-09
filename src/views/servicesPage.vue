<template>
  <div class="container">
    <div id="service" class="">
      <div class="head">
        <div class="info">
          <i class="fa-solid fa-user"></i>
          <span id="userName" v-if="user">{{ user.userName }}</span>
        </div>
        <div class="tag mb-5">
          <span class="service_name">SERVICE FOR ME</span>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">SERVICE NAME</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>
        <tbody>
          <serviceItem v-for="(service, index) in listServices" :key="index" :serviceItem="service" />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import serviceItem from "../components/serviceItem.vue";

export default {
  data() {
    return {
      serverURL: process.env.VUE_APP_SERVER_URL,
      token: localStorage.getItem("token"),
      info: [],
      listServices: [],
    };
  },
  components: {
    serviceItem,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async getListServices() {
      const listServices = await axios.get(`${this.serverURL}/api/services/list`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.listServices = listServices.data;
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
