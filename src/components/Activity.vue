<template>
  <div>
    <h4 v-if="activityName">{{ activityName }}</h4>
    <h4 v-else>&nbsp;</h4>
    <app-map class="gmap" :polylines="polylines"></app-map>
  </div>
</template>

<script>
  import Map from './Map';

  export default {
    data() {
      return {
        activityName: '',
        polylines: []
      };
    },
    methods: {
      async loadActivity() {
        try {
          let res = await this.$http.get(`activities/${ this.$route.params.id }`);
          let data = await res.json();
          this.activityName = data.name;
          this.polylines.push(data.map.polyline);

          // Test code.. adding another polyline to the array
          res = await this.$http.get(`activities/2496304013`);
          data = await res.json();
          this.polylines.push(data.map.polyline);
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