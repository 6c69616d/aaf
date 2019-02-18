<template>
  <div id="app">
    <Navigation/>
    <SpecificFile/>
  </div>
</template>

<script>
import SpecificFile from '../../components/SpecificFile.vue';
import Navigation from '../../components/navigation.vue';

export default {
    name: 'app',
    components: {
        SpecificFile,
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
