'use strict';
var chartData = {};
var today = moment().format('YYYY-MM-DD');
var daysFromToday = -14;
var startDate = moment(today).add(daysFromToday, 'days').format('YYYY-MM-DD');

var buildExchangeRateChart = function(date) {
    fetch(`https://exchangeratesapi.io/api/${date}?base=EUR&symbols=USD`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            putData(myJson, date);
            
            if (date !== today ) {
                date = moment(date).add(1, 'days').format('YYYY-MM-DD');
                buildExchangeRateChart(date);
            } else {
                return "Fetching done";
            }
        })
        .then(function (message) {
        if (message === "Fetching done") buildChart();
    });
};

function putData(myJson, date) {
    chartData[date] = myJson.rates.USD;
}

var buildChart = function() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(Object.keys(chartData)),
            datasets: [{
                label: 'USD to EUR exchange rate',
                data: Array.from(Object.values(chartData)),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.1)',
                ],
                borderColor: [
                    'rgba(34, 101, 168, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                },
            }
        }
    });
};

buildExchangeRateChart(startDate);