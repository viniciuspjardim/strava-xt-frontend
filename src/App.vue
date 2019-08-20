<template>
  <div class="container">
    <h1>Strava Activities</h1>
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
        <button class="btn btn-primary" @click.prevent="loadActivities(1)">Load Activities</button>
      </div>
    </form>
    <hr>
    <ul class="list-group" v-if="activities.length > 0">
      <li
        class="list-group-item"
        v-for="(activity, i) in activities"
        :key="i">
        {{ activity }}
      </li>
    </ul>
    <div v-else :class="messageClass" role="alert">
      {{ message.text }}
    </div>
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
  import moment from 'moment';

  export default {
    data() {
      return {
        page: 1,
        maxDate: null,
        minDate: null,
        message: {
          text: 'No activityes loaded.',
          type: 'alert'
        },
        activities: []
      }
    },
    methods: {
      async loadActivities(page) {
        try {
          this.page = page;
          let before = moment(this.maxDate, 'DD/MM/YYYY');
          let after = moment(this.minDate, 'DD/MM/YYYY');

          let params = {
            page,
            before: before.isValid() ? before.format('X') : null,
            after: after.isValid() ? after.format('X') : null
          };

          let res = await this.$http.get('activities/', { params });
          let data = await res.json();
          this.activities = [];

          console.log(data);

          data.forEach(activity => {
            let date = moment(new Date(activity.start_date)).format('DD/MM/YYYY');
            this.activities.push(`${activity.name} - ${date}`);
          });

          if(this.activities.length == 0) {
            this.message.text = 'No activityes found.';
            this.message.type = 'alert';
          }
        }
        catch(err) {
          console.log(err);
          this.message.text = 'Error loading activities!';
          this.message.type = 'error';
        }
      }
    },
    computed: {
      messageClass() {
        return this.message.type == 'error' ? 'alert alert-danger' : 'alert alert-primary';
      }
    },
    created() {
      this.loadActivities(1);
    }
  };
</script>

<style>
</style>