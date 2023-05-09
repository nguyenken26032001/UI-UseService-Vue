<template>
  <div class="container">
    <div id="profile " class="">
      <div class="info">
        <i class="fa-solid fa-user"></i>
        <span id="userName" v-if="user">{{ user.userName }}</span>
      </div>
      {{ serverURL }}
      <div id="token">
        <span class="text">TOKEN</span>
        <input type="text" disabled name="" id="" v-model="user.token" />
      </div>
      <div id="expired">
        <span class="text">Expired</span>
        <input type="text" disabled name="" id="" v-model="user.expiredDate" /> <span>DAYS</span>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      serverURL: process.env.VUE_APP_SERVER_URL,
      token: localStorage.getItem("token"),
      info: {},
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {},
  beforeMount() {},
  mounted() {},
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
</style>
