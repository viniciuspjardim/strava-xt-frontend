<script>
  import { LINE_PATH_CONFIG } from '../../constants/mapSettings';

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
      polylines: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        gpolylines: []
      };
    },
    watch: {
      polylines() {
        this.clear();
        this.polylines.forEach(element => {
          this.gpolylines.push(this.draw(element));
        });
        
        if(this.gpolylines.length > 0) {
          this.zoomToObject(this.gpolylines[0]);
        }
      }
    },
    methods: {
      draw(pl) {
        const { Polyline } = this.google.maps;
        const { decodePath } = this.google.maps.geometry.encoding;
        const decodedPath = decodePath(pl.polyline);

        const p = new Polyline({
          path: decodedPath,
          map: this.map,
          strokeColor: pl.color,
          ...LINE_PATH_CONFIG
        });
        return p;
      },
      zoomToObject(obj) {
        const bounds = new this.google.maps.LatLngBounds();
        const points = obj.getPath().getArray();
        for (var n = 0; n < points.length ; n++){
            bounds.extend(points[n]);
        }
        this.map.fitBounds(bounds);
      },
      clear() {
        this.gpolylines.forEach((pl, i) => {
          if(i == 0) return;
          pl.setMap(null);
        });
      }
    },
    render() {}
  };
</script>
