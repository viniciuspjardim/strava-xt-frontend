<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Strava Edit</router-link>
    <button class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

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
    </div>
  </nav>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>