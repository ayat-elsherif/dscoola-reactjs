import React from 'react';
import Chart from 'react-apexcharts';

import './index.scss';
const Revenue = () => {
  const apexLineChartWithLables = {
    chart: {
      height: 364,
      type: 'line',
      dropShadow: {
        enabled: true,
        opacity: 0.1,
        blur: 7,
        left: -7,
        top: 7,
      },
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    zoom: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ['#7E59D1', '#F2B636'],
    xaxis: {
      type: 'string',
      categories: [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
      offsetX: 0,
      offsetY: 10,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'k';
        },
      },
    },
  };

  const apexLineChartWithLablesData = [
    {
      name: 'Current year',
      data: [10, 20, 15, 25, 20, 30, 20, 40, 50, 60, 70, 30],
    },
    {
      name: 'Previous year',
      data: [0, 15, 10, 30, 15, 35, 25, 30, 40, 45, 50, 55],
    },
  ];
  return (
    <div className='revenue'>
      <h4>Revenu by location</h4>{' '}
      <div className='header-card'>
        <div className='revenue-info'>
          <div>Current year</div>
          <div>
            <span className='bult'></span>
            <span>$58.254</span>
          </div>
        </div>
        <div className='revenue-info'>
          <div>pervious year</div>
          <div>
            <span className='bult'></span>
            <span>$58.254</span>
          </div>
        </div>
      </div>
      <Chart
        options={apexLineChartWithLables}
        series={apexLineChartWithLablesData}
        type='line'
        className='apex-charts'
        height={364}
      />
    </div>
  );
};

export default Revenue;
