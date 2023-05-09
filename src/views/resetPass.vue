<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="changePass">
      <div class="panel panel-primary">
        <div class="panel-heading mt-5">
          <h2 class="text-center">RESET PASSWORD</h2>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="pwd"> New Password:</label>
            <input required="true" type="password" v-model="password" class="form-control" id="pwd" name="password" />
          </div>
          <button class="btn btn-success mt-2">ĐẶT LẠI</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      serverURL: process.env.VUE_APP_SERVER_URL,
      message: "",
    };
  },
  methods: {
    async changePass() {
      const res = await axios.post(`${this.serverURL}/api/user/change-pass`, {
        email: this.$route.query.email,
        token: this.$route.query.token,
        password: this.password,
      });
      if (res.data.code == 200) {
        this.message = res.data.message;
        setTimeout(() => this.$router.push({ path: "/login" }), 1000);
      } else {
        this.message = res.data.message;
      }
    },
  },
};
</script>
<style>
.errors {
  color: red;
}
</style>
