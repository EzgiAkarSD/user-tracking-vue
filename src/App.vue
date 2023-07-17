<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      view: "HomePage",
    };
  },
}
</script>

<style>

body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
