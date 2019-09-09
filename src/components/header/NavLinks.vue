<template>
  <ul class="navbar-nav" v-if="isLoggedIn">
    <router-link class="nav-item" to="/activities" tag="li" active-class="active">
      <a class="nav-link">My Activities</a>
    </router-link>
    <router-link class="nav-item" to="/gear" tag="li" active-class="active">
      <a class="nav-link">Gear Calculator</a>
    </router-link>
    <router-link class="nav-item" to="/map" tag="li" active-class="active">
      <a class="nav-link">Map</a>
    </router-link>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['isLoggedIn'])
    }
  }
</script>
