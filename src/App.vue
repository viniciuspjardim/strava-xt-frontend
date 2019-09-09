<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header/Header';

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
  a {
    cursor: pointer;
  }
</style>
