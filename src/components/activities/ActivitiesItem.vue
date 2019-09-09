<template>
  <div>
    <h6>{{ activity.name }}</h6>
    <div>
      <i class="material-icons">calendar_today</i>
      <span class="text-secondary">{{ activity.date }}</span>
      <i class="material-icons ml-3">schedule</i>
      <span class="text-secondary">{{ activity.time }}</span>
      <i class="material-icons ml-3">arrow_right_alt</i>
      <span class="text-secondary">{{ activity.distance }}</span>
      <i class="material-icons ml-3">speed</i>
      <span class="text-secondary">{{ activity.vel }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      activity: Object
    }
  }
</script>

<style scoped>
  i {
    color: rgb(0, 0, 0, 0.4);
    font-size: 1.2em !important;
  }
</style>