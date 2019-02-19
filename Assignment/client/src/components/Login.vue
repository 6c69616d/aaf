<template>
  <div class="Login">
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Login</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent>
        <md-field>
          <label>Email</label>
          <md-input type="email" v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input type="password" v-model="password"></md-input>
        </md-field>

        <md-button
          type="submit"
          class="md-raised md-primary"
          @click="submitLogin(email, password)"
        >Login</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitLogin(email, password) {
      this.$axios
        .post("http://localhost:3030/login", {
          email,
          password
        })
        .then(response => {
          localStorage.token = response.data.token;
          window.location.href = "/files/";
        })
        .catch(error => {
          console.log("Login Failed");
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
