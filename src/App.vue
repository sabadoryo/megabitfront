<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

#app {
  /*font-family: Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
}

* {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

body {
  /*overflow: hidden;*/
}

.table1 {
  position: absolute;
  z-index: 1000000000;
  left:15%;
}
@media only screen and (max-width: 1200px) {
  .table1 {
    display: none;
  }
}

</style>
