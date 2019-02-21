<template>
  <div id="app">
    <Navigation/>
    <div v-if="authenticated()">
      <EditSpecificFile/>
    </div>
    <div v-else>
      <h1>Please login to view this page</h1>
    </div>
  </div>
</template>

<script>
import EditSpecificFile from '../../components/EditSpecificFile.vue';
import Navigation from '../../components/navigation.vue';

export default {
    name: 'app',
    components: {
        EditSpecificFile,
        Navigation,
    },
    methods: {
        // check user has a token
        authenticated() {
            return localStorage.token;
        },
    },
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
