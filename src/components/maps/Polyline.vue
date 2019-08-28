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
    watch: {
      polylines() {
        const p = [];
        this.polylines.forEach(element => {
          p.push(this.draw(element));
        });
        
        if(p.length > 0) {
          this.zoomToObject(p[0]);
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
      }
    },
    render() {}
  };
</script>
