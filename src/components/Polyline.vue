<script>
  import { LINE_PATH_CONFIG } from '../constants/mapSettings';

  export default {
    props: {
      google: {
        type: Object,
        required: true
      },
      map: {
        type: Object,
        required: true
      },
      polyline: {
        type: String,
        required: true
      }
    },
    watch: {
      polyline() {
        this.draw();
      }
    },
    methods: {
      draw() {
        const { Polyline } = this.google.maps;
        const { decodePath } = this.google.maps.geometry.encoding;
        const decodedPath = decodePath(this.polyline);

        const p = new Polyline({
          path: decodedPath,
          map: this.map,
          ...LINE_PATH_CONFIG
        });
        this.zoomToObject(p);
      },
      zoomToObject(obj) {
        const bounds = new this.google.maps.LatLngBounds();
        const points = obj.getPath().getArray();

        for (var n = 0; n < points.length ; n++){
            bounds.extend(points[n]);
        }
        this.map.fitBounds(bounds);
      }
    },
    render() {}
  };
</script>
