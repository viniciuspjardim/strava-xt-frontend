<template>
  <div>
    <div v-if="isLoggedIn"
      class="dropdown">
      <button class="btn btn-danger btn-round dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ athlete.firstname }}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="logoutAndRedirect()">Logout</a>
      </div>
    </div>
    <router-link v-else
      class="btn btn-danger btn-round"
      to="/auth"
      tag="button">
      Connect to Strava
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['isLoggedIn', 'athlete'])
    },
    methods: {
      ...mapMutations(['logout']),

      logoutAndRedirect() {
        this.logout();
        this.$router.push('/').catch(err => {});
      }
    }
  }
</script>
