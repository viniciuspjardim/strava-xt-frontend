<template>
  <div>
    <h4>Elevation</h4>
    <app-message></app-message>
    <canvas id="chartjs" width="1000" height="400"></canvas>
  </div>
</template>

<script>
  import { RepositoryFactory } from '../../repository/RepositoryFactory';
  import { mapMutations } from 'vuex';
  import Chart from 'chart.js';
  import Message from '../Message';

  const StreamsRepository =  RepositoryFactory.get('streams');

  export default {
    props: {
      activities: Array
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
        if(this.$route.params.id) {
          this.overwriteChart(await this.loadElevation(this.$route.params.id));
          this.clearMessage();
        }
      }
      catch(err) {
        this.showMessage({ text: 'Could not load elevation data', type: 'error' });
      }
    },
    watch: {
      async activities() {
        const el = [];
        if(this.$route.params.id) {
          this.overwriteChart(await this.loadElevation(this.$route.params.id));
        }

        this.activities.forEach(async (activity) => {
          this.addToChart(await this.loadElevation(activity));
        });
      }
    },
    methods: {
      ...mapMutations(['showMessage', 'clearMessage']),
      async loadElevation(activityId) {
        const { data } = await StreamsRepository.getAltitude(activityId);
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
            borderColor: 'rgba(0, 0, 255, 0.5)',
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
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
            borderColor: 'rgba(255, 0, 0, 0.4)',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            pointRadius: 0,
          }
        ];
        this.chart.update();
      }
    }
  };
</script>
