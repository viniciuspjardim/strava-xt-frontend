<template>
  <div>
    <h4>Home</h4>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode';

  export default {
    async created() {
      if(this.$route.query.code) {
        try {
          this.$store.state.stravaCode = this.$route.query.code;
          let params = { code: this.$store.state.stravaCode };
          let res = await this.$http.get('auth/', { params });
          this.$store.state.jwtEncoded = res.headers.get('x-auth-token');
          if(!this.$store.state.jwtEncoded) {
            throw new Error('Unable to get JWT');
          }
          this.$store.state.athlete = jwtDecode(this.$store.state.jwtEncoded).strava.athlete;
          console.log(this.$store.state.athlete);
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