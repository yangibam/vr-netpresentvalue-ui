import {inject} from "aurelia-framework";
import {NpvService} from "components/npv/npvservice";
import {Chart} from "node_modules/chart.js/dist/Chart.js"

@inject(NpvService)
export class Calculator {
    constructor(npvService){
        this.npvService = npvService;
        this.cashflows = [];
        this.cashflows.push({amount : 0});

        this.lineOptions = {
        title:{
            display:true,
            text:'Net Present Value'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
            gridLines: {
                display: true,
            },
            scaleLabel: {
                display: true,
                labelString: 'Rate'
            }
            }],
            yAxes: [{
            gridLines: {
                display: true,
            },
            ticks: {
                beginAtZero: true
            },
            scaleLabel: {
                display: true,
                labelString: 'NPV'
            }
            }],
        },
        };
    }

    calculate() {        
        this.npvService.postNpv(this.investment, this.increment, this.lower, this.upper, this.cashflows)
            .then(data => {
                this.results = data.content;
                this.makeChart();
        });
    }

    addCashflow() {
        this.cashflows.push({amount : 0});
    }

    reset() {
        this.investment = 0;
        this.increment = 0;
        this.lower = 0; 
        this.upper = 0;
        this.cashflows = [];
        this.cashflows.push({amount : 0});
        this.results = undefined;
        this.npvChart.destroy();
    }

    makeChart() {
        var labels = this.results.npv.map(l => l.rate);
        var data = this.results.npv.map(d => d.amount);

        this.lineData = {
            labels: labels,
            datasets: [
              {
                label: 'NPV',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                fill: false,
              }
            ]
          };

        var ctx = document.getElementById("npvChart");
          
           this.npvChart = new Chart(ctx, {
            type: 'line',
            data: this.lineData,
            options: this.lineOptions,
          });       
    }
}

