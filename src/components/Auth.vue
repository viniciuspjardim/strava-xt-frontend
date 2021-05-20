<script>
  import { RepositoryFactory } from '../repository/RepositoryFactory';
  import { mapMutations } from 'vuex';
  import jwtDecode from 'jwt-decode';

  const AuthRepository =  RepositoryFactory.get('auth');

  export default {
    async created() {
      const q = { ...this.$route.query };

      // When redirected from Strava it supply the code parameter
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
          const { headers } = await AuthRepository.get({ params: { code } });
          const token = headers['x-auth-token'];
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
          const { data } = await AuthRepository.getLogin();
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
