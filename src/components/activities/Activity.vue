<template>
  <div>
    <h4 v-if="activityName">
      {{ activityName }}
      <button type="button"
        class="btn btn-primary btn-sm"
        data-toggle="modal"
        data-target="#exampleModalLong">
        compare
      </button>
    </h4>
    <h4 v-else>&nbsp;</h4>
    <app-activity-selector></app-activity-selector>
    <app-map class="gmap" :polylines="polylines"></app-map>
  </div>
</template>

<script>
  import Map from '../maps/Map';
  import ActivitySelector from './ActivitySelector';

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
          this.polylines.push({
            polyline: data.map.polyline,
            color: '#f44'
          });
        }
        catch(err) {
          console.log(err);
        }
      }
    },
    components: {
      appMap: Map,
      appActivitySelector: ActivitySelector
    },
    created() {
      this.loadActivity();
    }
  }
</script>

<style scoped>
  .gmap {
    margin-top: 12px;
    height: 400px !important;
    width: 100%;
  }
</style>