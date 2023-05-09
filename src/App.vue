<template>
  <div id="app">
    <menu-nav />
    <router-view></router-view>
  </div>
</template>

<script>
import menuNav from "./components/mainMenu.vue";
export default {
  name: "App",
  components: { menuNav },
  data() {
    return {
      id: "abc",
      isShow: true,
    };
  },
  beforeMount() {
    this.$store.dispatch("fetchUser");
  },
  mounted() {
    // this.$store.dispatch("fetchUser");
  },
};
</script>

<style></style>
