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
    props: {
      activities: Object
    },
    components: {
      appMessage: Message
    },
    data() {
      return {
        chart: null,
        chartData: {
          type: "line",
          data: {
            labels: [0],
            datasets: [{ label: ' altitude', data: [0] }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  maxRotation: 0,
                  padding: 6
                }
              }]
            }
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
        if(!this.activities && this.$route.params.id) {
          this.overwriteChart(await this.loadElevation(this.$route.params.id));
          this.clearMessage();
          // Test code
          this.addToChart(await this.loadElevation(2688883313));
        }
      }
      catch(err) {
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
        this.chart.data.datasets.push(
          {
            label: ' altitude',
            data: dataSet.altitude,
            borderColor: 'rgba(255, 0, 0, 0.4)',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            pointRadius: 0,
          }
        );
        this.chart.update();
      },
      overwriteChart(dataSet) {
        this.chart.data.labels = dataSet.distance;
        this.chart.data.datasets = [
          {
            label: ' altitude',
            data: dataSet.altitude,
            borderColor: 'rgba(0, 0, 255, 0.4)',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            pointRadius: 0,
          }
        ];
        this.chart.update();
      }
    }
  };
</script>
