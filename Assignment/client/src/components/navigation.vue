<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <md-toolbar md-elevation="1">
      <h3 class="md-title" style="flex: 1">File Management</h3>
      <md-button href="/files">Files</md-button>
      <md-button href="/index/">Home</md-button>
      <div v-if="authenticated()">
        <md-button id="logoutBtn" class="md-raised md-accent" @click="submitLogout()">Logout</md-button>
      </div>
      <div v-else>
        <md-button id="login" class="md-raised md-primary" href="/login/">Login</md-button>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'LastRowFixed',
  data() {
    return {
      menuVisible: true
    };
  },
  methods: {
    //check the user has a token
    authenticated() {
      return localStorage.token;
    },
    // method called when logout button clicked
    submitLogout() {
      this.$axios
        // post to the api so logout can be processed 
        .post("http://localhost:3030/logout")
        .then(() => {
          // delete the token from browser storage
          delete localStorage.token;
          // navigate to the login screen
          window.location.href = "/login/";
        })
        .catch(error => {
          alert("Logout Failed");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-toolbar {
  background-color: #FF8C00;
}
</style>
