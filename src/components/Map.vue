<template>
  <app-map-loader
    :mapConfig="mapConfig"
    apiKey=""
    class="gmap">
    <template slot-scope="{ google, map }">
  	  <app-polyline
        :polyline="polyline"
        :google="google"
        :map="map">
  	  </app-polyline>
    </template>
  </app-map-loader>
</template>

<script>
  import MapLoader from './MapLoader';
  import Polyline from './Polyline'
  import { mapSettings } from '../constants/mapSettings';

  export default {
    components: {
      appMapLoader: MapLoader,
      appPolyline: Polyline
    },
    props: {
      polyline: String
    },
    computed: {
      mapConfig() {
        return {
          ...mapSettings,
          center: { lat: 0, lng: 0 }
        };
      }
    }
  };
</script>

<style scoped>
  .gmap {
    height: 500px;
  }
</style>