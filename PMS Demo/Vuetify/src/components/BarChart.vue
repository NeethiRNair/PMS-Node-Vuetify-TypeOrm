<template>

  <canvas ref="myChart" :height="height"></canvas>
  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class BarChart extends Vue {
  @Prop({ default: [] }) readonly labels!: Array<string>
  @Prop({ default: 'pink' }) readonly color!: string
  @Prop({ default: [] }) readonly data!: Array<number>
  @Prop({ }) readonly height!: number
  @Prop({ }) readonly legend!: string
  @Prop({
    default: () => {
      return Chart.defaults.bar
    }
  })
  private chart: any = null;
  readonly options= {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false,
                offsetGridLines: true
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: true
        }
    

  mounted() {
    // Function call to create the chart and pass styles 
    this.createChart({
      datasets: [
        {
          data: this.data,
          label: this.legend,
          backgroundColor: this.color,
          borderColor:'grey',
          borderWidth: 1,
          maxBarThickness: 30,
              
        }
      ],
      labels: this.labels
    })
  }
  // Function defintion for creating the chart and loading it in the canvas element
  createChart(chartData: object) {
    const canvas = this.$refs.myChart as HTMLCanvasElement
    const options = {
      type: 'bar',
      data: chartData,
      options: this.options
    }
    this.chart = new Chart(canvas, options)
  }
}
</script>