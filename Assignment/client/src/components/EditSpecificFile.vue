<template>
  <div class="EditSpecificFile">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Edit File</h1>
      </md-toolbar>
      <div v-if="file.metadata">
        <form
          id="form"
          novalidate
          @submit.prevent="validateForm(file._id, file.metadata[file.metadata.length - 1])"
        >
          <md-field>
            <label>Name With File Type</label>
            <md-input type="text" disabled v-model="file.name_with_file_type"/>
          </md-field>
          <md-field>
            <label>Original Author</label>
            <md-input type="text" disabled v-model="file.original_author"/>
          </md-field>
          <md-field>
            <label>Creation Date</label>
            <md-input input="text" disabled v-model="file.creation_date"/>
          </md-field>
          <md-field>
            <label>Mime Type</label>
            <md-input type="text" disabled v-model="file.mime_type"/>
          </md-field>
          <md-field :class="getValidationClass('title')">
            <label for="title">Title</label>
            <md-input
              type="text"
              name="title"
              id="title"
              v-model="file.metadata[file.metadata.length - 1].title"
              @keyup="updateFormProperties(file)"
            />
            <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
          </md-field>
          <md-field :class="getValidationClass('version_number')">
            <label>Version Number</label>
            <md-input
              name="version_number"
              type="number"
              v-model="file.metadata[file.metadata.length - 1].version_number"
              @keyup="updateFormProperties(file)"
            />
            <span
              class="md-error"
              v-if="!$v.form.version_number.required"
            >The version number is required</span>
          </md-field>
          <md-field :class="getValidationClass('version_author')">
            <label>Version Author</label>
            <md-input
              type="text"
              name="version_author"
              v-model="file.metadata[file.metadata.length - 1].version_author"
              @keyup="updateFormProperties(file)"
            />
            <span
              class="md-error"
              v-if="!$v.form.version_author.required"
            >The version author is required</span>
          </md-field>

          <label>Version Date</label>
          <md-datepicker
            v-model="file.metadata[file.metadata.length - 1].version_date"
            md-immediately
          />
          <md-field>
            <label>Keywords/Tags</label>
            <md-input type="text" v-model="file.metadata[file.metadata.length - 1].keywords_tags"/>
          </md-field>
          <md-field>
            <label>File Size (MB)</label>
            <md-input type="number" v-model="file.metadata[file.metadata.length - 1].file_size"/>
          </md-field>
          <md-button type="submit" class="md-raised md-primary">Edit</md-button>
        </form>
      </div>
    </md-card>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'EditSpecificFile',
    mixins: [validationMixin],
    data() {
    return {
            file: {},
            form: {
                title: '',
                version_author: '',
                version_number: '',
            },
    };
  },
  validations: {
    form: {
      title: {
        required
      },
      version_author: {
        required
      },
      version_number: {
        required
      }
    }
  },
  methods: {
    // update the form properties using the file metadata properties so the form fields can be validated
    updateFormProperties(file) {
      const fileMetadata = file.metadata[file.metadata.length - 1];
      Object.keys(this.form).forEach(prop => {
        if (fileMetadata.hasOwnProperty(prop)) {
          this.form[prop] = fileMetadata[prop];
        }
      });
    },
    submitEditSpecificFile(fileId, newVersion) {
      this.$axios
        // update the file with the fileId using the api
        .put(`http://localhost:3030/files/${fileId}`, {
          locked: false,
          title: newVersion.title,
          version_number: newVersion.version_number,
          version_author: newVersion.version_author,
          version_date: newVersion.version_date,
          keywords_tags: Array.isArray(newVersion.keywords_tags)
            ? newVersion.keywords_tags
            : newVersion.keywords_tags.split(","),
          file_size: newVersion.file_size
        })
        .then(response => {
          // if sucessfully updated navigate to specific file screen for the file id
          window.location.href = `/specificFile/${fileId}`;
        })
        .catch(error => {
          alert("Unable to process new version");
        });
    },
    validateForm(fileId, file) {
      this.$v.form.$touch();
      // if there are validation errors return
      if (this.$v.form.$error) return;
      // else call the submitEditSpecificFile method
      this.submitEditSpecificFile(fileId, file);
    },
    // set the field to have the invalid styling if invalid or dirty
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
    // get the fileId from the url
    const currentUrl = window.location.pathname.split("/");
    const fileId = currentUrl[2];
    // lock the file so no one can edit or delete while user is editing
    this.$axios.put(`http://localhost:3030/files/${fileId}/lock`);
    this.$axios
    // get the file from the database using the api 
      .get(`http://localhost:3030/files/${fileId}`) // Pass in ID as param
      .then(response => {
        this.file = response.data;
        // set the form properties based off the response data 
        this.updateFormProperties(response.data);
      })
      .catch(error => {
        alert("Data Reterival Failed");
      });
  }
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
