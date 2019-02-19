<template>
  <div id="app">
    <Navigation/>
    <div v-if="authenticated()">
      <AllFiles/>
    </div>
    <div v-else>
      <h1>Please login to view this page</h1>
    </div>
  </div>
</template>

<script>
import AllFiles from "../../components/AllFiles.vue";
import Navigation from "../../components/navigation.vue";

export default {
  name: "app",
  components: {
    AllFiles,
    Navigation
  },
  methods: {
    authenticated() {
      return localStorage.token;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
