<template>
<div>
    <md-toolbar  md-elevation="1">
      <h3 class="md-title" style="flex: 1">Title</h3>
      <md-button href="google.com">Refresh</md-button>
      <md-button >Create</md-button>
    </md-toolbar>

  </div>
</template>



<script>
export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false
  })
}
</script>
