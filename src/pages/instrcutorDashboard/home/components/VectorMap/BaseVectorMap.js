import React, { useEffect, useState } from 'react';
import './index.scss';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

const BaseVectorMap = ({ width, height, options, type }) => {
  const selectorId = type + new Date().getTime();
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) {
      // create jsvectormap
      const map = new window['jsVectorMap']({
        selector: '#' + selectorId,
        map: type,
        ...options,
      });

      setMap(map);
    }
  }, [selectorId, map, options, type]);
  return (
    <>
      <div id={selectorId} style={{ width: width, height: height }}></div>
    </>
  );
};

export default BaseVectorMap;
