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
        polylines: [],
        colors: ['#f44', '#4c4', '#44f', '#848', '#666']
      };
    },
    watch: {
      $route(to, from) {
        for(let key in to.query) {
          this.polylines.length = 1;
          this.loadActivity(parseInt(key));
        }
      }
    },
    methods: {
      async loadActivity(id) {
        try {
          let res = await this.$http.get(`activities/${ id }`);
          let data = await res.json();
          this.activityName = data.name;
          this.polylines.push({
            id: data.id,
            polyline: data.map.polyline,
            color: this.colors[this.polylines.length]
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
      this.loadActivity(this.$route.params.id);
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