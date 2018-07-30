'use strict';

var fetchData = function() {
    for (var date in chartData) {
        (function () {
            var dateClosure = date; //make a closure to provide date to async code below

            fetch(`https://exchangeratesapi.io/api/${date}?base=EUR&symbols=USD`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    chartData[dateClosure] = myJson.rates.USD;
                    console.log(chartData); //for debug purposes TODO remove later
                });
        })();
    }
};

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

fetchData();
setTimeout(() => buildChart(), 1000);  //wait for fetch (async code) to finish <- TODO what are other options here?



