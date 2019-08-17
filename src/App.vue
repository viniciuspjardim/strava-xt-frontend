<template>
  <div class="container">
    <h1>Strava Activities</h1>
    <ul class="list-group" v-if="activities.length > 0">
      <li
        class="list-group-item"
        v-for="(activity, i) in activities"
        :key="i">
        {{ activity }}
      </li>
    </ul>
    <p v-else>No activities loaded.</p>
    <button class="btn btn-primary my-3" @click="loadActivities">Load Activities</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activities: []
      }
    },
    methods: {
      loadActivities() {
        this.$http.get('')
          .then(res => {
            return res.json();
          })
          .then(data => {
            data.forEach(activity => {
              this.activities.push(activity.name);
            });
          }
        );
      }
    }
  };
</script>

<style>
</style>