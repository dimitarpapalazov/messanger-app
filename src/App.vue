<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: {},
      login: false,
    }
  },
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import url('https://fonts.googleapis.com/css2?family=Rubik');

#app {
  font-family: 'Rubik', sans-serif;
  color: #34495E;
}
</style>
