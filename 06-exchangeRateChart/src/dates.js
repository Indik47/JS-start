var chartData = {};
var today = moment().date();

for (let i = -14; i <=0; i++) {
    var date = moment().date(today + i).format('YYYY-MM-DD');
    chartData[date] = '';
};


