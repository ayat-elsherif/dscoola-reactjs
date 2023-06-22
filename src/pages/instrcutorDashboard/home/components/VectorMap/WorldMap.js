import React from 'react';

//components
import BaseVectorMap from './BaseVectorMap';

const WorldVectorMap = ({ width, height, options }) => {
  return (
    <>
      <BaseVectorMap
        width={width}
        height={height}
        options={options}
        type='world'
      />
    </>
  );
};

export default WorldVectorMap;
