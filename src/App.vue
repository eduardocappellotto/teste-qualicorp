<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header.vue';
import './assets/scss/base.scss';

export default {
  components: {
    Header,
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body, html {
background: rgb(0,0,0);
background: radial-gradient(circle, rgba(0,0,0,1) 0%,
 rgba(15,31,42,1) 25%,
 rgba(28,59,81,1) 50%,
 rgba(43,90,123,1) 75%,
 rgba(57,120,165,1) 100%);
}

</style>
