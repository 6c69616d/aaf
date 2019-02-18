<template>
  <div id="app">
    <Navigation/>
    <AddFile/>
  </div>
</template>

<script>
import AddFile from '../../components/AddFile.vue';
import Navigation from '../../components/navigation.vue';

export default {
    name: 'app',
    components: {
        AddFile,
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
