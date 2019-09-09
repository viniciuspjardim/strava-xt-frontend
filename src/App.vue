<template>
  <div>
    <app-header></app-header>
    <div class="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
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
