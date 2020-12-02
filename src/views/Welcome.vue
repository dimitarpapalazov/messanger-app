<template>
  <div id="welcome" class="container-fluid vh-100 bg-light">
    <div
      id="content"
      class="col-lg-6 col-sm-12 bg-white border border-primarys rounded-lg"
    >
      <div class="text-center welcome-message">
        <h2>Welcome</h2>
        <h3>To The</h3>
        <h1>Messanger App</h1>
      </div>
      <div class="form-group">
        <label>Enter username:</label>
        <input
          v-model="user.username"
          class="form-control"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="form-group">
        <label>Enter password:</label>
        <input
          v-model="user.password"
          @keyup.enter="submit"
          class="form-control"
          type="password"
          placeholder="Password"
        />
      </div>
    </div>
  </div>
</template>

<script>
import App from '../App.vue'
export default {
  name: 'Welcome',
  data() {
    return {
      login: false,
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    submit: function () {
      App.user = this.user
      this.$http
        .get('https://messenger-app-748ad.firebaseio.com/users.json')
        .then(function (data) {
          for (let key in data['body']) {
            let dataUsername = data['body'][key].username
            let dataPassword = data['body'][key].password
            if (
              dataUsername === this.user.username &&
              dataPassword === this.user.password
            ) {
              this.login = true
              break
            }
          }
          App.login = this.login
          this.$router.push('messanger')
        })
    },
  },
}
</script>

<style scoped>
#welcome {
  display: flex;
  justify-content: center;
  align-items: center;
}

#content {
  padding: 5em;
}

h1,
h2,
h3 {
  color: #41B883;
  text-shadow: 2px 2px 4px #a0dbc1;
}

.welcome-message {
  margin-bottom: 2em;
}
</style>
