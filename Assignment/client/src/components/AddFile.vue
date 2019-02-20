<template>
  <div class="AddFile">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Add File</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent="validateAdd(file)">
        <md-field :class="getValidationClass('name_with_file_type')">
          <label>Name With File Type</label>
          <md-input name="name_with_file_type" type="text" v-model="file.name_with_file_type"/>
          <span
            class="md-error"
            v-if="!$v.file.name_with_file_type.required"
          >The name with file type is required</span>
        </md-field>
        <md-field :class="getValidationClass('original_author')">
          <label>Original Author</label>
          <md-input name="original_author" type="text" v-model="file.original_author"/>
          <span
            class="md-error"
            v-if="!$v.file.original_author.required"
          >The original author is required</span>
        </md-field>
        <md-field :class="getValidationClass('creation_date')">
          <label>Creation Date</label>
          <md-datepicker name="creation_date" v-model="file.creation_date" md-immediately/>
          <span
            class="md-error"
            v-if="!$v.file.creation_date.required"
          >The creation date is required</span>
        </md-field>
        <md-field :class="getValidationClass('mime_type')">
          <label>Mime Type</label>
          <md-input anme="mime_type" type="text" v-model="file.mime_type"/>
          <span class="md-error" v-if="!$v.file.mime_type.required">The mime type is required</span>
        </md-field>
        <md-field :class="getValidationClass('title')">
          <label>Title</label>
          <md-input name="title" type="text" v-model="file.title"/>
           <span class="md-error" v-if="!$v.file.title.required">The title is required</span>
        </md-field>
        <md-field>
          <label>Version Number</label>
          <md-input type="number" v-model="file.version_number"/>
        </md-field>
        <md-field :class="getValidationClass('version_author')">
          <label>Version Author</label>
          <md-input name="version_author" type="text" v-model="file.version_author"/>
          <span class="md-error" v-if="!$v.file.version_author.required">The version author is required</span>
        </md-field>

        <label>Version Date</label>
        <md-datepicker v-model="file.version_date" md-immediately/>
        <md-field>
          <label>Keywords/Tags</label>
          <md-input type="text" v-model="file.keywords_tags"/>
        </md-field>
        <md-field>
          <label>File Size (MB)</label>
          <md-input type="number" v-model="file.file_size"/>
        </md-field>
        <md-button type="submit" class="md-raised md-primary">Add</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'AddFile',
    mixins: [validationMixin],
    data() {
        return {
          file: {
            name_with_file_type: "",
            original_author: "",
            creation_date: "",
            mime_type: "",
            title: "",
            version_number: "1",
            version_author: "",
            version_date: new Date(),
            keywords_tags: "",
            file_size: ""
          }
        };
      },
      validations: {
        file: {
          name_with_file_type: {
            required
          },
          original_author: {
            required
          },
          creation_date: {
            required
          },
          mime_type: {
            required
          },
          title: {
            required
          },
          version_author: {
            required
          }
        }
      },
      methods: {
        getValidationClass(fieldName) {
          const field = this.$v.file[fieldName];

          if (field) {
            return {
              "md-invalid": field.$invalid && field.$dirty
            };
          }
        },
        validateAdd(file) {
          this.$v.$touch();

          if (!this.$v.$invalid) {
            this.submitAddFile(file);
          }
        },
        submitAddFile(newFile) {
          const keywords = newFile.keywords_tags.split(',');
          this.$axios
            .post("http://localhost:3030/files", {
              name_with_file_type: newFile.name_with_file_type,
              original_author: newFile.original_author,
              creation_date: newFile.creation_date,
              mime_type: newFile.mime_type,
              title: newFile.title,
              version_number: newFile.version_number,
              version_author: newFile.version_author,
              version_date: newFile.version_date,
              keywords_tags: keywords,
              file_size: newFile.file_size
            })
            .then(response => {
              window.location.href = `/files/`;
            })
            .catch(error => {
              alert("Unable to add new file");
            });
        }
      }
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
