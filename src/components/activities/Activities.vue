<template>
  <div>
    <h4>Activities</h4>
    <form class="form-inline mt-3">
      <div class="form-group mr-sm-3 mb-2">
        <label class="mr-sm-2">Max date</label>
        <input class="form-control" type="text" v-model="maxDate">
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <label class="mr-sm-2">Min date</label>
        <input class="form-control" type="text" v-model="minDate">
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <button class="btn btn-primary"
          @click.prevent="loadActivities(1)">
          Load Activities
        </button>
      </div>
    </form>
    <hr>
    <ul class="list-group" v-if="activities.length > 0">
      <router-link
        tag="li"
        :to="`/activities/${ activity.id }`"
        class="list-group-item"
        v-for="activity in activities"
        :key="activity.id">
        <app-activities-item :activity="activity"></app-activities-item>
      </router-link>
    </ul>
    <app-message></app-message>
    <br>
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" @click="loadActivities(page -1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" @click="loadActivities(1)">1</a></li>
        <li class="page-item"><a class="page-link" @click="loadActivities(2)">2</a></li>
        <li class="page-item"><a class="page-link" @click="loadActivities(3)">3</a></li>
        <li class="page-item">
          <a class="page-link" @click="loadActivities(page +1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import moment from 'moment';
  import { dataFormat } from '../../mixins/dataFormat';
  import ActivitiesItem from './ActivitiesItem';
  import Message from '../Message';

  // TODO: activities list showing even when they should not
  // when using the back button from a activity page.
  // Probably a vuex related problem
  export default {
    mixins: [dataFormat],
    components: {
      appActivitiesItem: ActivitiesItem,
      appMessage: Message
    },
    methods: {
      ...mapMutations(['setActivities', 'showMessage', 'clearMessage']),
      async loadActivities(page) {
        try {
          if(page) {
            this.page = page;
          }
          let before = moment(this.maxDate, 'DD/MM/YYYY');
          let after = moment(this.minDate, 'DD/MM/YYYY');

          let params = {
            page: this.page,
            before: before.isValid() ? before.format('X') : null,
            after: after.isValid() ? after.format('X') : null
          };

          let res = await this.$http.get('activities/', { params });
          let data = await res.json();
          this.setActivities([]);

          data.forEach(activity => {
            this.activities.push({
              id: activity.id,
              name: activity.name,
              date: this.dateToUsr(activity.start_date),
              time: this.timeToUsr(activity.moving_time),
              distance: this.distanceToUsr(activity.distance),
              vel: this.velToUsr(activity.average_speed)
            });
          });

          if(this.activities.length == 0) {
            this.showMessage({ text: 'No activityes found.', type: 'alert' });
          }
          else {
            this.clearMessage();
          }
        }
        catch(err) {
          console.log(err);
          this.setActivities([]);
          this.showMessage({ text: 'Error loading activities!', type: 'error' });
        }
      }
    },
    computed: {
      ...mapGetters(['activities']),
      page: {
        get() {
          return this.$store.state.activitiesFilter.page;
        },
        set(value) {
          this.$store.state.activitiesFilter.page = value;
        }
      },
      maxDate: {
        get() {
          return this.$store.state.activitiesFilter.maxDate;
        },
        set(value) {
          this.$store.state.activitiesFilter.maxDate = value;
        }
      },
      minDate: {
        get() {
          return this.$store.state.activitiesFilter.minDate;
        },
        set(value) {
          this.$store.state.activitiesFilter.minDate = value;
        }
      }
    },
    created() {
      this.loadActivities();
    }
  };
</script>

<style scoped>
  li {
    cursor: pointer;
  }
</style>
