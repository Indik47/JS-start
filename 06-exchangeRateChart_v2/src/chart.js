'use strict';
var chartData = {};
var daysPeriod = 14;
var today = moment().format('YYYY-MM-DD');
var startDate = moment(today).add( (-daysPeriod + 1), 'days').format('YYYY-MM-DD');

/**
 * Increments date by 1 day
 * @param date - date to increment
 * @return {*} - incremented date in moment.js format
 */
var incrementDate = function(date) {
    return moment(date).add(1, 'days').format('YYYY-MM-DD');
};

/**
 * Puts exchange rate data into object
 * @param targetObject - object to put data into
 * @param json - json with data
 * @param date - corresponding date
 */
var putData = function(targetObject, json, date) {
    targetObject[date] = json.rates.USD;
};

/**
 * Fetches data for the period from API
 * @param period - in days
 * @param startDate
 * @return {Array} - Promises returned by fetch
 */
var fetchData = function(period, startDate) {
    var date = startDate;
    var promisesArray = [];

    for (var i = 0; i <= period; i++) {
        promisesArray.push(fetch(`https://exchangeratesapi.io/api/${date}?base=EUR&symbols=USD`));
        date = incrementDate(date);
    }
    return promisesArray;
};

/**
 * Resolves all promises
 * @param promises - promises to resolve
 * @param startDate -
 * @return {Promise<any[]>}
 */
var resolvePromises = function (promises, startDate) {
    var date = startDate;

    return Promise.all(promises)
        .then(responces => {
        responces.forEach(responce => {
            responce.json()
                .then(json => {
                    putData(chartData, json, date);
                    date = incrementDate(date);
                });
        });
    });
};

/**
 * Builds exchange rate chart with chart.js
 */
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


var promises = fetchData(daysPeriod, startDate);
resolvePromises(promises, startDate)
    .then( () => {
    buildChart();
});

