<template>
  <div class="container d-flex justify-content-center">
    <form @submit.prevent="register">
      <div class="panel panel-primary">
        <div class="panel-heading mt-5">
          <h2 class="text-center">REGISTER FORM</h2>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label for="usr">Name:</label>
            <input required type="text" v-model="userName" class="form-control" name="userName" />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input required="true" type="email" v-model="email" class="form-control" name="email" id="email" />
            <span v-if="message" class="errors">{{ message }}</span>
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input required="true" type="password" v-model="password" class="form-control" id="pwd" name="password" />
          </div>
          <button class="btn btn-success mt-2">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      serverURL: process.env.VUE_APP_SERVER_URL,
      userName: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async register() {
      try {
        const res = await axios.post(`${this.serverURL}/api/user/register`, {
          userName: this.userName,
          email: this.email,
          password: this.password,
        });
        if (res.data.code == 200) {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ path: "/profile" });
        } else {
          console.log(res.data.message);
          this.message = res.data.message;
          setTimeout(() => {
            this.message = "";
          }, 2000);
        }
      } catch (err) {
        console.log("error: " + err.message);
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
