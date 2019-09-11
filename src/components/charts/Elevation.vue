<template>
  <div>
    <h4>Elevation</h4>
    <app-message></app-message>
    <canvas id="chartjs" width="1000" height="400"></canvas>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import Chart from 'chart.js';
  import Message from '../Message';

  export default {
    components: {
      appMessage: Message
    },
    data() {
      return {
        chart: null,
        chartData: {
          type: "bar",
          data: {
            labels: [0],
            datasets: [{ label: ' altitude', data: [0] }]
          }
        }
      };
    },
    async mounted() {
      try {
        this.chart = new Chart(
          document.getElementById("chartjs"),
          this.chartData
        );
        this.addToChart(await this.loadElevation(2688883313));
        this.clearMessage();
      }
      catch(err) {
        console.log('Err 1');
        this.showMessage({ text: 'Could not load elevation data', type: 'error' });
      }
    },
    methods: {
      ...mapMutations(['showMessage', 'clearMessage']),
      async loadElevation(activityId) {
        const res = await this.$http.get(`streams/activity/${ activityId }`);
        const data = await res.json();
        return {
          altitude: data[0].data,
          distance: data[1].data
        };
      },
      addToChart(dataSet) {
        this.chart.data.labels = dataSet.distance;
        this.chart.data.datasets = [
          {
            label: ' altitude',
            data: dataSet.altitude
          }
        ];
        this.chart.update();
      }
    }
  };
</script>
