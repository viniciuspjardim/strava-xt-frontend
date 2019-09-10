<template>
  <div>
    <h4>Elevation</h4>
    <canvas id="chartjs" width="1000" height="400"></canvas>
  </div>
</template>

<script>
  import Chart from 'chart.js';

  export default {
    data() {
      return {
        chart: null
      };
    },
    async mounted() {
      this.chart = new Chart(
        document.getElementById("chartjs"),
        {
          type: "bar",
          data: {
            labels: [0],
            datasets: [
              {
                label: ' altitude',
                data: [0]
              }
            ]
          }
        }
      );

      const dataSet = await this.loadElevation(2688883313);
      this.chart.data.labels = dataSet.distance;
      this.chart.data.datasets = [
        {
          label: ' altitude',
          data: dataSet.altitude
        }
      ];
      this.chart.update();
    },
    methods: {
      async loadElevation(activityId) {
        try {
          const res = await this.$http.get(`streams/activity/${ activityId }`);
          const data = await res.json();
          return {
            altitude: data[0].data,
            distance: data[1].data
          };
        }
        catch(err) {
          console.log(err);
        }
      }
    }
  };
</script>
