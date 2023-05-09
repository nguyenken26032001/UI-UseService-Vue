<template>
  <div class="d-flex justify-content-center">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <RouterLink class="navbar-brand" to="/">SINGLE PAGE</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"><span class="navText">Home</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register"><span class="navText">Register</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><span class="navText">Login</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile"><span class="navText">Profile</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/services"><span class="navText">Services</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/buyPackage"><span class="navText">Buy Packages</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/transactionsLogs"><span class="navText">Transactions Logs</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/useServices"><span class="navText">Use Services</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <button v-if="isLogin" class="btn btn-danger" @click="logout()">LOG OUT</button>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    // console.log("123 " + JSON.stringify(this.$route));
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ path: "/login" });
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem("token");
      this.isLogin = false;
      this.$router.push({ path: "/login" });
    },
  },
  watch: {
    "$route.path"() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ path: "/login" });
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
  },
};
</script>
<style>
h2 {
  color: red;
}
.nav-link {
  font-size: 25px;
}
.navText {
  color: #ff6651;
}
</style>
