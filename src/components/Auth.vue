<script>
  import { mapMutations } from 'vuex';
  import jwtDecode from 'jwt-decode';

  export default {
    async created() {
      const q = { ...this.$route.query };

      // When redirected from Strava it suply the code parameter
      if(q.code) {
        this.fetchLoginData(q.code);
      }
      // When there is no query parameters redirect to the
      // Strava website to authenticate and authorize this app
      else {
        this.redirectToStrava();
      }
    },
    methods: {
      ...mapMutations(['login']),

      async fetchLoginData(code) {
        try {
          // Fetching auth data from the server
          const res = await this.$http.get('auth/', { params: { code } });
          const token = res.headers.get('x-auth-token');
          if(!token) throw new Error('Unable to get JWT');
          const athlete = jwtDecode(token).athlete;
          // Register auth data into Vuex
          this.login({ token, athlete });
          this.$router.push('/').catch(err => {});
        }
        catch(err) {
          console.log(err);
        }
      },
      async redirectToStrava() {
        try {
          const res = await this.$http.get('auth/stravalogin', {});
          const data = await res.json();
          window.location.href = data.url;
        }
        catch(err) {
          console.log(err);
        }
      }
    },
    render() {}
  }
</script>