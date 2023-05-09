<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="sendEmail">
      <div class="panel panel-primary">
        <div class="panel-heading mt-5">
          <h2 class="text-center">Xác thực</h2>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="email">Email:</label>
            <input required="true" type="email" v-model="email" class="form-control" name="email" id="email" />
            <span v-if="message" class="errors">{{ this.message }}</span>
          </div>
          <button class="btn btn-success mt-2">SEND</button>
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
      serverURL: process.env.VUE_APP_SERVER_URL,
      message: "",
      isToken: localStorage.getItem("token"),
    };
  },
  methods: {
    async sendEmail() {
      console.log(this.email);
      const res = await axios.post(`${this.serverURL}/api/user/forgot-pass`, {
        email: this.email,
      });
      if (res.data.code == 200) {
        this.message = res.data.message;
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
