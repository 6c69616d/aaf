<template>
  <div id="app">
    <Navigation/>
    <EditSpecificFile/>
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
