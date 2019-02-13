<template>
<div class="AllFiles">
    <md-table md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">All Files</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name With File Type</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Version Number</md-table-head>
        <md-table-head>Version Author</md-table-head>
      </md-table-row>

  <div class="file" v-for="file in AllFiles" :key="file._id">
      <md-table-row md-selectable="single">
        <md-table-cell md-numeric>{{ file._id }}</md-table-cell>
        <md-table-cell>{{ file.nameWithFileType }}</md-table-cell>
        <md-table-cell> {{ file.metadata[file.metadata.length - 1].title }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_number }}</md-table-cell>
         <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_author }}</md-table-cell>
      </md-table-row>
  </div>
    </md-table>
    <p>Selected:</p>
    {{ selected }}
  </div>
</template>

<script>
export default {
  name: 'AllFiles',
  data() {
    return {
      AllFiles: null,
      selected: {},
    };
  },
  mounted() {
    this.$axios
      .get('http://localhost:3030/files')
      .then((response) => {
        this.AllFiles = response.data;
      });
  },
  methods: {
    onSelect(file) {
      this.selected = file;
    },
  },
};

</script>

<style scoped>
.AllFiles {
  margin: 0 100px;
}
</style>
