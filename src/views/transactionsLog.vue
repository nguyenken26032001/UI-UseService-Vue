<template>
  <div class="container">
    <div id="service" class="">
      <div class="head">
        <div class="info">
          <i class="fa-solid fa-user"></i>
          <span id="userName" v-if="user">{{ user.userName }}</span>
        </div>
        <div class="tag mb-5">
          <span class="service_name">LỊCH SỬ MUA</span>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">PACKAGE NAME</th>
            <th scope="col">TOKEN</th>
            <th scope="col">TYPE</th>
            <th scope="col">MODE</th>
            <th scope="col">CREATED_AT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transItem, index) in transactions" :key="index">
            <td>{{ transItem.packageName }}</td>
            <td>{{ transItem.quantityToken }}</td>
            <td>{{ transItem.type }}</td>
            <td>{{ transItem.mode }}</td>
            <td>{{ transItem.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      serverURL: process.env.VUE_APP_SERVER_URL,
      token: localStorage.getItem("token"),
      info: [],
      transactions: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    filteredTransactions() {
      return this.transactions.filter((transItem) => {
        return transItem.packageName != "free";
      });
    },
  },
  async beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    async transactionsLog() {
      const data = await axios.get(`${this.serverURL}/api/wallet/info`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.transactions = data.data;
      this.transactions.forEach((el) => {
        const date = new Date(el.createdAt);
        el.createdAt = date.toLocaleString("en-GB");
      });
      console.log(this.transactions);
    },
  },
  mounted() {
    this.transactionsLog();
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
