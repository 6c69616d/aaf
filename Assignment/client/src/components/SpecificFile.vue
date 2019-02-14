<template>
<div class="Specific File">
    <div class="SpecificFile">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Original File</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Name With File Type</md-table-head>
        <md-table-head>Author</md-table-head>
        <md-table-head>Creation Date</md-table-head>
        <md-table-head>Mime Type</md-table-head>
      </md-table-row>
        <md-table-row>
        <md-table-cell>{{ file.nameWithFileType }}</md-table-cell>
        <md-table-cell>{{ file.original_author }}</md-table-cell>
        <md-table-cell>{{ file.creation_date }}</md-table-cell>
        <md-table-cell>{{ file.mime_type }}</md-table-cell>
      </md-table-row>
    </md-table>
    </div>
    <!-- <div class="versions">
    <md-table>
      <md-table-row md-selectable="single" class="file" v-for="file in AllFiles" :key="file._id" @click="onSelect(file._id)">
        <md-table-cell>{{ file.nameWithFileType }}</md-table-cell>
        <md-table-cell> {{ file.metadata[file.metadata.length - 1].title }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_number }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_author }}</md-table-cell>
      </md-table-row>
    </md-table>
    <p>Selected:</p>
    {{ selected }}
    </div> -->
</div>
</template>

<script>
export default {
  name: 'SpecificFile',
  data() {
    return {
      SpecificFile: [],
      selected: {},
    };
  },
  mounted() {
    const currentUrl = window.location.pathname.split('/');
    const fileId = currentUrl[2];
    this.$axios
      .get(`http://localhost:3030/files/${fileId}`) // Pass in ID as param
      .then((response) => {
        this.SpecificFile = response.data;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
};

</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
  .AllFiles {
    padding: 50px 100px;
  }
</style>
