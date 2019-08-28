<template>
  <div class="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header';

  export default {
    components: {
      appHeader: Header
    }
  }
</script>

<style>
  body {
    overflow-y: scroll;
  }
  i {
    color: rgb(0, 0, 0, 0.4);
    font-size: 1.2em !important;
  }
</style>