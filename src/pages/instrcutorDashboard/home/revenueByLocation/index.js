import { Progress } from 'antd';
import React from 'react';
import WorldVectorMap from '../components/VectorMap/WorldMap';
import './index.scss';
const RevenueByLocation = () => {
  const options = {
    zoomOnScroll: false,
    markers: [
      { name: 'New York', coords: [40.71, -74.0] },
      { name: 'San Francisco', coords: [37.77, -122.41] },
      { name: 'Sydney', coords: [-33.86, 151.2] },
      { name: 'Singapore', coords: [1.3, 103.8] },
    ],
    markerStyle: {
      initial: {
        r: 9,
        fill: '#727cf5',
        'fill-opacity': 0.9,
        stroke: '#fff',
        'stroke-width': 7,
        'stroke-opacity': 0.4,
      },
      hover: {
        fill: '#727cf5',
        stroke: '#fff',
        'fill-opacity': 1,
        'stroke-width': 1.5,
      },
    },
    regionStyle: {
      initial: {
        fill: '#e3eaef',
      },
    },
  };
  return (
    <div className="revenueby-location">
      <h4>Revenu by location</h4>{' '}
      <WorldVectorMap height="224px" width="100%" options={options} />
      <div className="details">
        <h5>New York</h5>
        <div className="progress-w-percent">
          <Progress
            percent={75}
            size="small"
            format={(percent) => `${percent} K`}
          />
        </div>
        <h5>San Francisco</h5>
        <div className="progress-w-percent">
          <Progress
            percent={39}
            size="small"
            format={(percent) => `${percent} K`}
          />
        </div>
        <h5>Sydney</h5>
        <div className="progress-w-percent">
          <Progress
            percent={25}
            size="small"
            format={(percent) => `${percent} K`}
          />
        </div>
        <h5>Singapore</h5>
        <div className="progress-w-percent mb-0">
          <Progress
            percent={61}
            size="small"
            format={(percent) => `${percent} K`}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueByLocation;
