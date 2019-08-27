<template>
  <div>
    <h4>{{ activityName }}</h4>
    <app-map class="gmap" :lines="lines">
    </app-map>
    <h5>Polyline</h5>
    <p>{{ polyline }}</p>
  </div>
</template>

<script>
  import Map from './Map';

  export default {
    data() {
      return {
        activityName: '',
        polyline: '',
        lines: [
          {
            id: '1',
            path: [{ lat: 3, lng: 101 }, { lat: 5, lng: 99 }]
          },
          {
            id: '2',
            path: [{ lat: 5, lng: 99 }, { lat: 6, lng: 97 }]
          }
        ]
      };
    },
    methods: {
      async loadActivity() {
        try {
          let res = await this.$http.get(`activities/${ this.$route.params.id }`);
          let data = await res.json();
          this.activityName = data.name;
          this.polyline = data.map.polyline;
          console.log(data);
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
    width: 70%;
  }
</style>