let url3 = "https://api.rootnet.in/covid19-in/stats/history";
let xmlhttp3 = new XMLHttpRequest();

xmlhttp3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let myArr1 = JSON.parse(this.responseText);
        getAll1(myArr1);
    }
}

function getAll1(myArr1)
{
    let total_confirmed = [];
    let discharged = [];
    let deaths = [];
    let daily = myArr1.data;
    for(let i=0;i<daily.length;i++)
    {
      let total1 = daily[i].summary.total;
      let discharged1 = daily[i].summary.discharged;
      let deaths1 = daily[i].summary.deaths;
      total_confirmed.push(total1);
      discharged.push(discharged1);
      deaths.push(deaths1);
    }


Highcharts.chart('total_container', {
    chart: {
        type: 'spline',
        scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1
        }
    },
    title: {
        text: 'Corona Cases in India to date',
        align: 'left'
    },
    xAxis: {
        type: 'datetime',
        labels: {
            overflow: 'justify'
        }
    },
    yAxis: {
        title: {
            text: 'Total Corona Cases'
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: []
    },
    tooltip: {
        valueSuffix: 'cases'
    },
    plotOptions: {
        spline: {
            lineWidth: 4,
            states: {
                hover: {
                    lineWidth: 5
                }
            },
            marker: {
                enabled: false
            },
            pointInterval: 7200000*12, // one hour
            pointStart: Date.UTC(2020, 2, 10, 0, 0, 0)
        }
    },
    series: [{
        name: 'Total Cases',
        data: total_confirmed
   },
   {
    name : "Discharged",
    data:discharged
   },
   {
    name:"Deaths",
    data:deaths
   }],
    navigation: {
        menuItemStyle: {
            fontSize: '10px'
        }
    }
});
}
xmlhttp3.open("GET", url3, true);
xmlhttp3.send();
