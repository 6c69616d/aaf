<template>
  <div class="EditSpecificFile">
    <md-card>
      <div id="form">
        <md-field>
          <label>Name With File Type</label>
          <md-input disabled v-model="file.nameWithFileType"></md-input>
        </md-field>
        <md-field>
          <label>Original Author</label>
          <md-input disabled v-model="file.original_author"></md-input>
        </md-field>
        <md-field>
          <label>Creation Date</label>
          <md-input disabled v-model="file.creation_date"></md-input>
        </md-field>
        <md-field>
          <label>Mime Type</label>
          <md-input disabled v-model="file.mime_type"></md-input>
        </md-field>
        <md-field>
          <label>Title</label>
          <md-input v-model="file.metadata[file.metadata.length - 1].title"></md-input>
        </md-field>
        <md-field>
          <label>Version Number</label>
          <md-input v-model="file.metadata[file.metadata.length - 1].version_number"></md-input>
        </md-field>
        <md-field>
          <label>Version Author</label>
          <md-input v-model="file.metadata[file.metadata.length - 1].version_author"></md-input>
        </md-field>
        <md-field>
          <label>Version Date</label>
          <md-input v-model="Date.now"></md-input>
        </md-field>
        <md-field>
          <label>Keywords/Tags</label>
          <md-input v-model="file.metadata[file.metadata.length - 1].keywords_tags"></md-input>
        </md-field>
        <md-field>
          <label>File Size (MB)</label>
          <md-input v-model="file.metadata[file.metadata.length - 1].file_size"></md-input>
        </md-field>
        <md-button class="md-raised md-primary" @click>Edit</md-button>
      </div>
    </md-card>
  </div>
</template>
<script>
export default {
  name: "EditSpecificFile",
  data() {
    return {
      file: {},
      selected: {}
    };
  },
  mounted() {
    const currentUrl = window.location.pathname.split("/");
    const fileId = currentUrl[2];
    this.$axios
      .get(`http://localhost:3030/files/${fileId}`) // Pass in ID as param
      .then(response => {
        this.file = response.data;
      })
      .catch(error => {
        console.log("Data Reterival Failed");
      });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
#form {
  padding: 10px 200px;
}
.EditSpecificFile {
  padding: 50px 100px;
}
</style>
