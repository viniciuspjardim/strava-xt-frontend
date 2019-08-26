<template>
  <div>
    <h4>{{ activityName }}</h4>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activityName: ''
      };
    },
    methods: {
      async loadActivity() {
        try {
          let res = await this.$http.get(`activities/${ this.$route.params.id }`);
          let data = await res.json();
          this.activityName = data.name;
          console.log(data);
        }
        catch(err) {
          console.log(err);
        }
      }
    },
    created() {
      this.loadActivity();
    }
  }
</script>

<style scoped>

</style>