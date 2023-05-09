<template>
  <div class="container">
    <div id="service" class="">
      <div class="head">
        <div class="info">
          <i class="fa-solid fa-user"></i>
          <span id="userName" v-if="user">{{ user.userName }}</span>
        </div>
        <div class="tag mb-5">
          <span class="service_name">BUY PACKAGE FOR ME</span>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">PACKAGE NAME</th>
            <th scope="col">TOKEN</th>
            <th scope="col">EXPIRE</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(packageItem, index) in listPackages" :key="index">
            <input type="radio" v-model="checked" name="check" :value="packageItem._id" />
            <td>{{ packageItem.packageName }}</td>
            <td>{{ packageItem.quantityToken }}</td>
            <td>{{ packageItem.expire }}</td>
            <td>{{ packageItem.price }} VND</td>
          </tr>
          <!-- <packageItem ref="packageFarther" v-for="(packageItem, index) in listPackages" :key="index" :packageItem="packageItem" /> -->
        </tbody>
      </table>
    </div>
    <button @click="buyPackage" class="btn btn-success px-5">BUY</button>
  </div>
  <span v-if="statusBuyPackage" style="color: red; font-size: 30px; text-align: center">Buy Package Successfully</span>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      serverURL: process.env.VUE_APP_SERVER_URL,
      token: localStorage.getItem("token"),
      listPackages: [],
      checked: "",
      statusBuyPackage: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    ...mapMutations(["setUser"]),
    async buyPackage() {
      const data = await axios.post(
        `${this.serverURL}/api/wallet/add`,
        {
          packageId: this.checked,
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.statusBuyPackage = data.data.status;
      this.$store.dispatch("fetchUser");
      setTimeout(() => {
        this.$router.push({ path: "/profile" });
      }, 1000);
    },
    async getListPackages() {
      const listPackages = await axios.get(`${this.serverURL}/api/packages/list`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.listPackages = listPackages.data;
      this.checked = this.listPackages[0]._id;
    },
  },
  mounted() {
    this.getListPackages();
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
