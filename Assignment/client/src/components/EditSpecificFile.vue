<template>
  <div class="EditSpecificFile">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Edit File</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent="validateForm(file._id, file.metadata[file.metadata.length - 1])">
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
        <md-field :class="getValidationClass('title')">
          <label for="title">Title</label>
          <md-input
            type="text"
            name="title"
            id="title"
            v-model="file.metadata[file.metadata.length - 1].title" @keyup="updateFormProperties(file)"
          ></md-input>
          <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
        </md-field>
        <md-field>
          <label>Version Number</label>
          <md-input type="number" v-model="file.metadata[file.metadata.length - 1].version_number"></md-input>
        </md-field>
        <md-field :class="getValidationClass('version_author')">
          <label>Version Author</label>
          <md-input type="text" name="version_author" v-model="file.metadata[file.metadata.length - 1].version_author" @keyup="updateFormProperties(file)"></md-input>
          <span class="md-error" v-if="!$v.form.version_author.required">The author is required</span>
        </md-field>

        <label>Version Date</label>
        <md-datepicker
          v-model="file.metadata[file.metadata.length - 1].version_date"
          md-immediately
        />
        <md-field>
          <label>Keywords/Tags</label>
          <md-input type="text" v-model="file.metadata[file.metadata.length - 1].keywords_tags"></md-input>
        </md-field>
        <md-field>
          <label>File Size (MB)</label>
          <md-input type="number" v-model="file.metadata[file.metadata.length - 1].file_size"></md-input>
        </md-field>
        <md-button type="submit" class="md-raised md-primary">Edit</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "EditSpecificFile",
  mixins: [validationMixin],
  data() {
    return {
      file: {},
      form: {
        title: '',
        version_author: '',
      }
    };
  },
  
  validations: {
    form: {
      title: {
        required
      },
      version_author: {
        required
      }
    }
  },
  methods: {
    updateFormProperties(file) {
      const fileMetadata = file.metadata[file.metadata.length - 1];
      Object.keys(this.form).forEach((prop) => {
        if (fileMetadata.hasOwnProperty(prop)) {
          this.form[prop] = fileMetadata[prop];
        }
      });
    },
    submitEditSpecificFile(fileId, newVersion) {
      this.$axios
        .put(`http://localhost:3030/files/${fileId}`, {
          locked: false,
          title: newVersion.title,
          version_number: newVersion.version_number,
          version_author: newVersion.version_author,
          version_date: newVersion.version_date,
          keywords_tags: newVersion.keywords_tags,
          file_size: newVersion.file_size
        })
        .then(response => {
          window.location.href = `/specificFile/${fileId}`;
        })
        .catch(error => {
          console.log("Unable to process new version");
        });
    },
    validateForm(fileId, file) {
      this.$v.form.$touch();
      if(this.$v.form.$error) return
      this.submitEditSpecificFile(fileId, file);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$error
        };
      }
    }
  },
  mounted() {
    const currentUrl = window.location.pathname.split("/");
    const fileId = currentUrl[2];
    this.$axios.put(`http://localhost:3030/files/${fileId}`, { locked: true });
    this.$axios
      .get(`http://localhost:3030/files/${fileId}`) // Pass in ID as param
      .then(response => {
        this.file = response.data;
        this.updateFormProperties(response.data);
      })
      .catch(error => {
        console.log("Data Reterival Failed");
      });
  },
};
</script>

<style lang="scss" scoped>
#form {
  padding: 10px 200px;
}
.EditSpecificFile {
  padding: 50px 100px;
}
</style>
