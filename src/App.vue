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
    <div v-else :class="messageClass" role="alert">
      {{ message.text }}
    </div>
    <hr>
    <button class="btn btn-primary my-1" @click="loadActivities">Load Activities</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: {
          text: 'No activityes loaded.',
          type: 'alert'
        },
        activities: []
      }
    },
    methods: {
      async loadActivities() {
        try {
          let res = await this.$http.get('');
          let data = await res.json();
          this.activities.length = 0;

          data.forEach(activity => {
            this.activities.push(activity.name);
          });
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
    }
  };
</script>

<style>
</style>