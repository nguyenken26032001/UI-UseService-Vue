<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="login">
      <div class="panel panel-primary">
        <div class="panel-heading mt-5">
          <h2 class="text-center">LOGIN FORM</h2>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="email">Email:</label>
            <input required="true" type="email" v-model="email" class="form-control" name="email" id="email" />
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input required="true" type="password" v-model="password" class="form-control" id="pwd" name="password" />
          </div>
          <button class="btn btn-success mt-2">LOGIN</button>
          <router-link to="/forgot-pass">Quên mật khẩu</router-link>
          <h2 v-if="message">{{ message }}</h2>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from "axios";
import { CLOSING } from "ws";
export default {
  data() {
    return {
      email: "",
      password: "",
      serverURL: process.env.VUE_APP_SERVER_URL,
      message: "",
      isToken: localStorage.getItem("token"),
    };
  },
  methods: {
    async login() {
      try {
        await axios
          .post(`${this.serverURL}/api/user/login`, {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            if (res.data.code == 200) {
              localStorage.setItem("token", res.data.token);
              this.message = "LOGIN SUCCESSFULLY";
              setTimeout(() => this.$router.push({ path: "/profile" }), 1000);
            }
          });
      } catch (error) {
        this.message = error.response.data.message;
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
