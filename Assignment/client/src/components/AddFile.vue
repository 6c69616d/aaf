<template>
  <div class="AddFile">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add File</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent>
        <md-field>
          <label>Name With File Type</label>
          <md-input type="text" v-model="file.nameWithFileType"></md-input>
        </md-field>
        <md-field>
          <label>Original Author</label>
          <md-input type="text" v-model="file.original_author"></md-input>
        </md-field>
        <label>Creation Date</label>
        <md-datepicker
          v-model="file.creation_date"
          md-immediately
        />
        <md-field>
          <label>Mime Type</label>
          <md-input type="text" v-model="file.mime_type"></md-input>
        </md-field>
        <md-field>
          <label>Title</label>
          <md-input type="text" v-model="file.title"></md-input>
        </md-field>
        <md-field>
          <label>Version Number</label>
          <md-input type="number" v-model="file.version_number"></md-input>
        </md-field>
        <md-field>
          <label>Version Author</label>
          <md-input type="text" v-model="file.version_author"></md-input>
        </md-field>

        <label>Version Date</label>
        <md-datepicker
          v-model="file.version_date"
          md-immediately
        />
        <md-field>
          <label>Keywords/Tags</label>
          <md-input type="text" v-model="file.keywords_tags"></md-input>
        </md-field>
        <md-field>
          <label>File Size (MB)</label>
          <md-input type="number" v-model="file.file_size"></md-input>
        </md-field>
        <md-button
          type="submit"
          class="md-raised md-primary"
          @click="submitAddFile(file)"
        >Add</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
export default {
    name: 'AddFile',
    data() {
        return {
            file: {
                nameWithFileType: '',
                original_author: '',
                creation_date: '',
                mime_type: '',
                title: '',
                version_number: '',
                version_author: '',
                version_date: '',
                keywords_tags: '',
                file_size: '',
            },
        };
    },
    methods: {
        submitAddFile(newFile) {
            this.$axios
                .post('http://localhost:3030/files', {
                    nameWithFileType: newFile.nameWithFileType,
                    original_author: newFile.original_author,
                    creation_date: newFile.creation_date,
                    mime_type: newFile.mime_type,
                    title: newFile.title,
                    version_number: newFile.version_number,
                    version_author: newFile.version_author,
                    version_date: newFile.version_date,
                    keywords_tags: newFile.keywords_tags,
                    file_size: newFile.file_size,

                })
                .then((response) => {
                    // window.location.href = `/files/`;
                    console.log(response);
                })
                .catch((error) => {
                    console.log('Unable to add new file');
                });
        },
    },
};
</script>

<style lang="scss" scoped>
#form {
  padding: 10px 200px;
}
.AddFile {
  padding: 50px 100px;
}
</style>
