<template>
  <div>
    <h4 v-if="activityName">{{ activityName }}</h4>
    <h4 v-else>&nbsp;</h4>
    <app-map class="gmap" :polyline="polyline"></app-map>
  </div>
</template>

<script>
  import Map from './Map';

  export default {
    data() {
      return {
        activityName: '',
        polyline: ''
      };
    },
    methods: {
      async loadActivity() {
        try {
          let res = await this.$http.get(`activities/${ this.$route.params.id }`);
          let data = await res.json();
          this.activityName = data.name;
          this.polyline = data.map.polyline;
        }
        catch(err) {
          console.log(err);
        }
      }
    },
    components: {
      appMap: Map
    },
    created() {
      this.loadActivity();
    }
  }
</script>

<style scoped>
  .gmap {
    height: 400px !important;
    width: 100%;
  }
</style>