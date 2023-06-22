import { Select } from 'antd';
import React from 'react';
import Chart from 'react-apexcharts';
import { DownArrowIcon } from '../../../../assets/svg';
import './index.scss';
const { Option } = Select;
const Index = () => {
  const apexBarChartOpts = {
    // grid: {
    //     padding: {
    //         left: 0,
    //         right: 0,
    //     },
    // },
    chart: {
      height: 300,
      type: 'bar',
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '15%',
        borderRadius: 3,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    zoom: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    colors: ['#7E59D1', '#E3EAEF'],
    xaxis: {
      categories: [
        'Agile',
        'Graphic design',
        'indesign',
        'Graphic design',
        'UI/UX Design',
        'UX Research',
        'UI/UX Design',
        'Marketing',
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'k';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 0,
      offsetY: 0,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$' + val + 'k';
        },
      },
    },
  };

  const apexBarChartData = [
    {
      name: 'Enrollment',
      data: [320, 320, 320, 300, 300, 300, 300, 100],
    },
    {
      name: 'Views',
      data: [280, 280, 280, 300, 300, 300, 300, 300],
    },
  ];
  return (
    <div className='views-card'>
      {' '}
      <div>
        <h3>Student Enrollment & views</h3>
        <div className='views-filter'>
          <Select suffixIcon={<DownArrowIcon />} allowClear>
            <Option value='1' className='custom-option'>
              last month
            </Option>
            <Option value='2' className='custom-option'>
              last month2
            </Option>
          </Select>
        </div>
      </div>
      <Chart
        options={apexBarChartOpts}
        series={apexBarChartData}
        type='bar'
        className='apex-charts'
        height={300}
      />
    </div>
  );
};

export default Index;
