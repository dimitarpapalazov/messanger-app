<template>
  <div id="box" class="container-fluid vh-100 bg-light">
    <div
      v-show="!login"
      id="not-logged"
      class="col-lg-6 col-sm-12 bg-white border border-primarys rounded-lg text-center"
    >
      <h3>
        You did not log in, please go
        <router-link to="/" style="color: #41B883">back</router-link> and try
        again!
      </h3>
    </div>
    <div
      v-show="login"
      id="content"
      class="col-lg-10 col-sm-12 bg-white border border-primarys rounded-lg"
    >
      <div
        ref="messages"
        id="messages"
        class="col-lg-12 overflow-auto"
        v-chat-scroll="{ always: false, smooth: true }"
      >
        <div
          class="msg border border-primarys rounded-lg text-wrap text-break shadow-sm"
          v-for="m in messages"
          :key="m.id"
          v-bind:class="ownMessage(m.username)"
        >
          <div class="usr">{{ m.username }}</div>
          <div class="dtm">{{ m.datetime }}</div>
          <div class="cnt">{{ m.content }}</div>
        </div>
      </div>
      <div id="compose" class="input-group mb-3 border-top">
        <input
          v-model="message.content"
          @keyup.enter="send"
          type="text"
          class="form-control"
          placeholder="Write a message"
        />
        <div class="input-group-append">
          <button @click="send" class="btn btn-outline-secondary" type="button">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import App from '../App.vue'

export default {
  data() {
    return {
      login: false,
      username: '',
      message: {
        username: '',
        content: '',
        datetime: '',
      },
      url: 'https://messenger-app-748ad.firebaseio.com/messages.json',
      messages: [],
    }
  },
  methods: {
    send: function () {
      let today = new Date()
      let minutes = String(today.getMinutes()).padStart(2, '0')
      let hour = String(today.getHours()).padStart(2, '0')
      let day = String(today.getDate()).padStart(2, '0')
      let month = String(today.getMonth() + 1).padStart(2, '0')
      let year = today.getFullYear()
      let date = hour + ':' + minutes + ' ' + day + '.' + month + '.' + year
      this.message.datetime = date
      this.message.username = this.username
      this.$http.post(this.url, this.message).then(function () {
        this.message.content = ''
      })
    },
    get: function () {
      this.$http
        .get(this.url)
        .then(function (data) {
          return data.json()
        })
        .then(function (data) {
          var messagesArray = []
          for (let key in data) {
            data[key].id = key
            messagesArray.push(data[key])
          }
          this.messages = messagesArray
        })
    },
    ownMessage: function (m) {
      if (m == this.username) {
        return 'own'
      }
      return 'bg-light'
    },
  },
  created() {
    this.get()
    this.username = App.user.username
    this.login = App.login
  },
  mounted() {},
  updated() {
    this.get()
  },
  computed: {},
}
</script>

<style scoped>
#box {
  display: flex;
  justify-content: center;
  align-items: center;
}
#messages {
  height: 85vh;
}
#compose {
  padding: 1em;
}
input {
  margin: 0;
}
.btn-outline-secondary:hover {
  background: #41B883;
}
.msg {
  padding: 0.5em;
  max-width: 50%;
  margin: 0.5em;
}
.usr {
  font-weight: bold;
  font-size: 1.1em;
}
.dtm {
  font-size: 0.8em;
  color: lightgray;
}
.cnt {
  font-size: 1em;
}
.own {
  background: #41B883;
  color: whitesmoke;
  margin-left: auto;
}
#not-logged {
  padding: 3em;
  color: crimson;
  font-weight: bold;
}
</style>