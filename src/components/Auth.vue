<template>
  <div>
    <h4>Auth</h4>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode';

  export default {
    async created() {
      const q = { ...this.$route.query };

      // When redirected from Strava it suply the code parameter
      if(q.code) {
        try {
          // Fetching auth data from the server
          const res = await this.$http.get('auth/', { params: { code: q.code } });
          const token = res.headers.get('x-auth-token');
          if(!token) throw new Error('Unable to get JWT');
          const athlete = jwtDecode(token).athlete;
          // Register auth data into Vuex
          const authData = { token, athlete };
          this.$store.state.auth = authData;
        }
        catch(err) {
          console.log(err);
        }
      }
      // When logout parameter is defined, clear auth data
      else if(this.$route.query.logout) {
        this.$store.state.auth.token = null;
        this.$store.state.auth.athlete = null;
      }
      // When there is no query parameters redirect to the
      // Strava website to authenticate and authorize this app
      else {
        try {
          const res = await this.$http.get('auth/stravalogin', {});
          const data = await res.json();
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