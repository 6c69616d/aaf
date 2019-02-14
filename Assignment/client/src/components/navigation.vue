<template>
<div>
    <md-toolbar  md-elevation="1">
      <h3 class="md-title" style="flex: 1">File Management</h3>
      <md-button href="/files">Files</md-button>
      <md-button href="/index">Home</md-button>
    </md-toolbar>

  </div>
</template>

<script>
export default {
    name: 'LastRowFixed',
    data: () => ({
        menuVisible: true,
    }),
};
</script>

<style lang="scss" scoped>
  .md-toolbar {
  background-color: #CFC7BA;
  }
</style>
