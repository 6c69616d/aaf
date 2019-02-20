<template>
  <div class="Login">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Login</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent="validateLogin(form)">
        <md-field :class="getValidationClass('email')">
          <label>Email</label>
          <md-input name="email" type="email" v-model="form.email"/>
          <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
          <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
        </md-field>
        <md-field :class="getValidationClass('password')">
          <label>Password</label>
          <md-input name="password" type="password" v-model="form.password"/>
          <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
        </md-field>

        <md-button type="submit" class="md-raised md-primary">Login</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateLogin(form) {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.submitLogin(form.email, form.password);
      }
    },
    submitLogin(email, password) {
      this.$axios
        .post("http://localhost:3030/login", {
          email,
          password
        })
        .then(response => {
          if(response.data.token) {
            localStorage.token = response.data.token;
            window.location.href = "/files/";
          } else {
            alert("Incorrect Login Details");
          }
        })
        .catch(error => {
          alert("Login Failed");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#form {
  padding: 10px 100px;
}
.Login {
  padding: 50px 500px;
}
</style>
