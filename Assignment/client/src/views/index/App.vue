<template>
  <div id="app">
    <Navigation/>
    <img alt="Vue logo" src="../../assets/logo.png">
  </div>
</template>

<script>

import Navigation from '../../components/navigation.vue';

export default {
    name: 'app',
    components: {
        Navigation,
    },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
