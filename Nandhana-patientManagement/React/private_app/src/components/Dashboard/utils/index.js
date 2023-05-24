import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';




const Chart = ({ data }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  console.log('data',data)
  const options = {
    chart: {
      animation: {
        duration: 1000,
      },
      type: 'column',
    },
    title: false,
    xAxis: {
      categories: months,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      max: 20,
      title: false,
      tickInterval: 2,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      symbolRadius: 0,
      itemMarginTop: 20,
      itemStyle: {
        fontWeight: 'bold',
      },
    },
    tooltip: {
      borderColor: 'white',
      borderRadius: 10,
      headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    series: [
      {
        color: '#0075E9',
        data: data,
        name: 'No. of consultations',
        pointWidth: 5,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;