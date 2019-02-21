<template>
  <div class="AllFiles">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">All Files</h1>
        <input type="text" v-model="search" placeholder="Search"/>
        <md-button id="addBtn" class="md-icon-button md-raised md-primary" @click="addFile()">
          <md-icon>add</md-icon>
        </md-button>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Name With File Type</md-table-head>  
        <md-table-head>Mime Type</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Version Number</md-table-head>
        <md-table-head>Version Author</md-table-head>
      </md-table-row>

      <md-table-row
        md-selectable="single"
        class="file"
        v-for="file in filteredList"
        :key="file._id"
        @click="onSelect(file._id)"
      >
        <md-table-cell>{{ file.name_with_file_type}}</md-table-cell>
        <md-table-cell>{{ file.mime_type }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].title }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_number }}</md-table-cell>
        <md-table-cell>{{ file.metadata[file.metadata.length - 1].version_author }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "AllFiles",
  data() {
    return {
      AllFiles: [],
      selected: {},
      search: "",
        };
    },
    mounted() {
    // retrieve all the files from the datanse using the api
        this.$axios.get('http://localhost:3030/files').then((response) => {
            this.AllFiles = response.data;
        });
    },
    computed: {
        filteredList() {
            // filter all the files based on the search criteria and return or return all the files
            return this.AllFiles.filter((file) => {
                return (
                // eslint-disable-next-line
          (!file.metadata[file.metadata.length - 1].hasOwnProperty("title") &&
            !this.search.toLowerCase())
                    // eslint-disable-next-line
          || (file.metadata[file.metadata.length - 1].hasOwnProperty("title") &&
                      file.metadata[file.metadata.length - 1].title
                          .toLowerCase()
                          .includes(this.search.toLowerCase()))
          // eslint-disable-next-line
          || (!file.metadata[file.metadata.length - 1].hasOwnProperty('version_author')
          && !this.search.toLowerCase())
          // eslint-disable-next-line
          || (file.metadata[file.metadata.length - 1].hasOwnProperty('version_author')
          && file.metadata[file.metadata.length - 1].version_author
              .toLowerCase()
              .includes(this.search.toLowerCase()))
          // eslint-disable-next-line
          || (!file.metadata[file.metadata.length - 1].hasOwnProperty('version_number') && !this.search)
          // eslint-disable-next-line
          || (file.metadata[file.metadata.length - 1].hasOwnProperty('version_number')
          // eslint-disable-next-line
          && file.metadata[file.metadata.length - 1].version_number
              .toString()
              .includes(this.search))
          // eslint-disable-next-line
          || (!file.name_with_file_type
          )
          // eslint-disable-next-line
          && (!this.search.toLowerCase())
          // eslint-disable-next-line
          || (file.name_with_file_type
          )
          // eslint-disable-next-line
          && file.name_with_file_type
              .toLowerCase()
              .includes(this.search.toLowerCase())
          // eslint-disable-next-line
          || (!file.mime_type
          )
          // eslint-disable-next-line
          && (!this.search.toLowerCase())
          // eslint-disable-next-line
          || (file.mime_type
          )
          // eslint-disable-next-line
          && file.mime_type
              .toLowerCase()
              .includes(this.search.toLowerCase())
                );
            });
        },
    },
    methods: {
        // on the select of a file navigate to the specific file screen of that file
        onSelect(file) {
            this.selected = file;
            window.location.href = `/specificFile/${file}`;
        },
        // on click of the add button navigate to the add file screen
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
