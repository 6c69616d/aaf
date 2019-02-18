<template>
  <div class="AllFiles">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">All Files</h1>
        <md-button id="addBtn" class="md-icon-button md-raised md-primary" @click="addFile()">
          <md-icon>add</md-icon>
        </md-button>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>ID</md-table-head>
        <md-table-head>Name With File Type</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Version Number</md-table-head>
        <md-table-head>Version Author</md-table-head>
      </md-table-row>

      <md-table-row
        md-selectable="single"
        class="file"
        v-for="file in AllFiles"
        :key="file._id"
        @click="onSelect(file._id)"
      >
        <md-table-cell>{{ file._id }}</md-table-cell>
        <md-table-cell>{{ file.nameWithFileType }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].title }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_number }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_author }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
    name: 'AllFiles',
    data() {
        return {
            AllFiles: [],
            selected: {},
        };
    },
    mounted() {
        this.$axios.get('http://localhost:3030/files').then((response) => {
            this.AllFiles = response.data;
        });
    },
    methods: {
        onSelect(file) {
            console.log('onSelect called');
            this.selected = file;
            window.location.href = `/specificFile/${file}`;
        },
        addFile() {
            window.location.href = '/addFile/';
        },
    },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.AllFiles {
  padding: 50px 100px;
}
</style>
