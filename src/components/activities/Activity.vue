<template>
  <div>
    <app-activity-selector></app-activity-selector>
    <app-map class="gmap" :polylines="polylines"></app-map>
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
    <app-elevation :activities='selected'></app-elevation>
  </div>
</template>

<script>
  import { RepositoryFactory } from '../../repository/RepositoryFactory';
  import Map from '../maps/Map';
  import { activitiesCache } from '../../mixins/activitiesCache';
  import ActivitySelector from './ActivitySelector';
  import Elevation from '../charts/Elevation';

  const ActivitiesRepository =  RepositoryFactory.get('activities');
  
  export default {
    mixins: [activitiesCache],
    data() {
      return {
        activityName: '',
        polylines: [],
      };
    },
    watch: {
      $route(to, from) {
        this.routeChange(to);
        this.update();
      }
    },
    methods: {
      async loadActivity(id) {
        try {
          const { data } = await ActivitiesRepository.getActivity(id);
          data.color = this.getColor(data.id);
          return data;
        }
        catch(err) {
          console.log(err);
        }
      },
      routeChange(to) {
        const selection = [];
        // Load activityes that are not in the cache
        for(let key in to.query) {
          selection.push(parseInt(key));
        }
        this.selectionChange(selection);
      },
      // TODO: refector this method
      async update() {
        // Creating promises array with activities that
        // are not in the cache
        const promisses = [];
        this.selected.forEach(activityId => {
          if(!this.hasOnCache(activityId)) {
            promisses.push(this.loadActivity(activityId));
          }
        });
        // Awaiting them to load
        const activities = await Promise.all(promisses);
        // Adding them to the cache
        activities.forEach(activity => {
          this.addToCache(activity);
        });
        
        this.polylines = [];
        // Creating the polylines
        this.selected.forEach(activityId => {
          const polyline = {
            id: activityId,
            polyline: this.getFromCache(activityId).map.polyline,
            color: this.getFromCache(activityId).color
          };
          this.polylines.push(polyline);
        });
      }
    },
    components: {
      appMap: Map,
      appActivitySelector: ActivitySelector,
      appElevation: Elevation
    },
    async created() {
      this.selectionChange([this.$route.params.id]);
      this.main = this.$route.params.id;
      const mainObj = await this.loadActivity(this.$route.params.id);
      this.activityName = mainObj.name;
      this.addToCache(mainObj);
      this.update();
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