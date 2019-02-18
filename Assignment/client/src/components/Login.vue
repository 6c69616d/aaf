<template>
  <div class="Login">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <md-card>
      <md-toolbar>
        <h1 class="md-title">Login</h1>
      </md-toolbar>
      <form id="form" novalidate @submit.prevent>
        <md-field>
          <label>Email</label>
          <md-input type="email" v-model="loginDetails.email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input type="password" v-model="loginDetails.password"></md-input>
        </md-field>

        <md-button type="submit" class="md-raised md-primary" @click="login()">Login</md-button>
      </form>
    </md-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginDetails: {}
    };
  },
  methods: {
    login() {
      window.location.href = `/files/`;
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
