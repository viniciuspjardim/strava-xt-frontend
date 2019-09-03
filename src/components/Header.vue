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
      <form class="form-inline ml-auto my-2 my-lg-0">
        <button v-if="this.$store.state.jwtEncoded"
          class="btn btn-outline-danger my-2 my-sm-0"
          @click.prevent="">
          {{ this.$store.state.athlete.firstname }}
        </button>
        <button v-else
          class="btn btn-outline-danger my-2 my-sm-0"
          @click.prevent="stravaApi()">
          Connect to Strava
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      async stravaApi() {
        try {
          let res = await this.$http.get('auth/stravalogin', {});
          let data = await res.json();
          window.location.href = data.url;
        }
        catch(err) {
          console.log(err);
        }
      }
    }
  }
</script>

<style scoped>

</style>