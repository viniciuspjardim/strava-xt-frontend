<template>
  <app-map-loader
    :mapConfig="mapConfig"
    apiKey=""
    class="gmap">
  </app-map-loader>
</template>

<script>
  import MapLoader from "./MapLoader";
  import { mapSettings } from "../constants/mapSettings";

  export default {
    components: {
      appMapLoader: MapLoader
    },

    computed: {
      mapConfig() {
        return {
          ...mapSettings,
          center: { lat: 5, lng: 99 }
        };
      }
    }
  };
</script>

<style scoped>
  .gmap {
    height: 600px;
  }
</style>