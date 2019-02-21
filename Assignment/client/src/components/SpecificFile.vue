<template>
  <div class="SpecificFile">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <div class="SpecificFile1">
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">Original File</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-head>Name With File Type</md-table-head>
          <md-table-head>Author</md-table-head>
          <md-table-head>Creation Date</md-table-head>
          <md-table-head>Mime Type</md-table-head>
          <md-table-head>Checked Out</md-table-head>
          <md-table-head></md-table-head>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{ file.name_with_file_type }}</md-table-cell>
          <md-table-cell>{{ file.original_author }}</md-table-cell>
          <md-table-cell> <span v-if="file.creation_date != null">{{ new Date(file.creation_date).toLocaleDateString() }}</span></md-table-cell>
          <md-table-cell>{{ file.mime_type }}</md-table-cell>
          <md-table-cell>{{ file.locked }}</md-table-cell>
          <md-table-cell>
            <md-button
              id="editBtn"
              class="md-icon-button md-raised"
              @click="editSpecificFile(file._id)"
            >
              <md-icon>edit</md-icon>
            </md-button>
            <md-button
              id="deleteBtn"
              class="md-icon-button md-raised md-accent"
              @click="deleteSpecificFile(file._id)"
            >
              <md-icon class="fa fa-trash"></md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="versions">
      <md-table>
        <md-table-toolbar>
          <h1 class="md-title">Versions</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-head>Title</md-table-head>
          <md-table-head>Version Number</md-table-head>
          <md-table-head>Version Author</md-table-head>
          <md-table-head>Version Date</md-table-head>
          <md-table-head>File Size</md-table-head>
          <md-table-head>Keywords/Tags</md-table-head>
        </md-table-row>
        <md-table-row v-for="v in file.metadata" :key="v._id">
          <md-table-cell>{{ v.title }}</md-table-cell>
          <md-table-cell>{{ v.version_number }}</md-table-cell>
          <md-table-cell>{{ v.version_author }}</md-table-cell>
          <md-table-cell> <span v-if="v.version_date != null">{{ new Date(v.version_date).toLocaleDateString() }} </span></md-table-cell>
          <md-table-cell>{{ v.file_size }}</md-table-cell>
          <md-table-cell>{{ v.keywords_tags }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpecificFile",
  data() {
    return {
      file: {},
      selected: {},
      first: false
    };
  },
  mounted() {
    // get the file id from the url
    const currentUrl = window.location.pathname.split("/");
    const fileId = currentUrl[2];
    this.$axios
      // get the file with the fileId from the database using the api
      .get(`http://localhost:3030/files/${fileId}`)
      .then(response => {
        this.file = response.data;
        // stop the user editing and deleting the file if the file is locked
        document.getElementById("editBtn").disabled = this.file.locked;
        document.getElementById("deleteBtn").disabled = this.file.locked;
      })
      .catch(error => {
        alert("Data Reterival Failed");
      });
  },
  methods: {
    // method called from the delete button
    deleteSpecificFile(fileId) {
      this.$axios
        // get the file with the fileId from the database using the api
        .get(`http://localhost:3030/files/${fileId}`)
        .then(response => {
          // if the file is not locked proceed with the delete
          if (!response.data.locked) {
            this.$axios
              // delete the file from the database using the api
              .delete(`http://localhost:3030/files/${fileId}`)
              .then(() => {
                this.file = [];
                // redirect to the all files screen
                window.location.href = "/files";
              })
              .catch(error => {
                alert("Delete Failed");
              });
          } else {
            // reload screen so edit and delete buttons become disbaled
            window.location.reload();
          }
        });
    },
    // method called from edit button
    editSpecificFile(fileId) {
      this.$axios
        // get the file with the fileId from the database using the api 
        .get(`http://localhost:3030/files/${fileId}`)
        .then(response => {
           // if the file is not locked navigate to the edit form
          if (!response.data.locked) {
            window.location.href = `/editSpecificFile/${fileId}`;
          } else {
            // reload screen so edit and delete buttons become disbaled
            window.location.reload();
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.SpecificFile {
  padding: 50px 100px;
}
</style>
