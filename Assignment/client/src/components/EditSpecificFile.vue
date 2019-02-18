<template>
  <div class="EditSpecificFile">
    <md-card>
      <md-toolbar>
          <h1 class="md-title">Edit File</h1>
        </md-toolbar>
      <form id="form" novalidate @submit.prevent>
        <md-field>
          <label>Name With File Type</label>
          <md-input type="text" disabled v-model="file.nameWithFileType"></md-input>
        </md-field>
        <md-field>
          <label>Original Author</label>
          <md-input type="text" disabled v-model="file.original_author"></md-input>
        </md-field>
        <md-field>
          <label>Creation Date</label>
          <md-input input="text" disabled v-model="file.creation_date"></md-input>
        </md-field>
        <md-field>
          <label>Mime Type</label>
          <md-input type="text" disabled v-model="file.mime_type"></md-input>
        </md-field>
        <md-field>
          <label>Title</label>
          <md-input type="text" v-model="file.metadata[file.metadata.length - 1].title"></md-input>
        </md-field>
        <md-field>
          <label>Version Number</label>
          <md-input type="number" v-model="file.metadata[file.metadata.length - 1].version_number"></md-input>
        </md-field>
        <md-field>
          <label>Version Author</label>
          <md-input type="text" v-model="file.metadata[file.metadata.length - 1].version_author"></md-input>
        </md-field>

        <label>Version Date</label>
        <md-datepicker
          v-model="file.metadata[file.metadata.length - 1].version_date"
          md-immediately
        />
        <md-field>
          <label>Keywords/Tags</label>
          <md-input tpye="text" v-model="file.metadata[file.metadata.length - 1].keywords_tags"></md-input>
        </md-field>
        <md-field>
          <label>File Size (MB)</label>
          <md-input type="number" v-model="file.metadata[file.metadata.length - 1].file_size"></md-input>
        </md-field>
        <md-button
          type="submit"
          class="md-raised md-primary"
          @click="submitEditSpecificFile(file._id, file.metadata[file.metadata.length - 1])"
        >Edit</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
export default {
    name: 'EditSpecificFile',
    data() {
        return {
            file: {},
        };
    },
    mounted() {
        const currentUrl = window.location.pathname.split('/');
        const fileId = currentUrl[2];
        this.$axios
            .get(`http://localhost:3030/files/${fileId}`) // Pass in ID as param
            .then((response) => {
                this.file = response.data;
            })
            .catch((error) => {
                console.log('Data Reterival Failed');
            });
    },
    methods: {
        submitEditSpecificFile(fileId, newVersion) {
            this.$axios
                .put(`http://localhost:3030/files/${fileId}`, {
                    locked: false,
                    title: newVersion.title,
                    version_number: newVersion.version_number,
                    version_author: newVersion.version_author,
                    version_date: newVersion.version_date,
                    keywords_tags: newVersion.keywords_tags,
                    file_size: newVersion.file_size,
                })
                .then((response) => {
                    window.location.href = `/specificFile/${fileId}`;
                })
                .catch((error) => {
                    console.log('Unable to process new version');
                });
        },
    },
};
</script>

<style lang="scss" scoped>
#form  {
  padding: 10px 200px;
}
.EditSpecificFile {
  padding: 50px 100px;
}
</style>
