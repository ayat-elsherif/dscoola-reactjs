import { Checkbox, Collapse, Space } from 'antd';
import React from 'react';
import '../FilterSection.scss';
import { buildQueryString } from '../util';

export default function Durations({
  onFilterOptionsChange,
  meta,
  header,
  queryParam,
}) {
  const { Panel } = Collapse;

  const durations = constructDurations(meta);
  let durationQueryString = '';


  return (
    <Collapse defaultActiveKey={['0']} onChange={alert} className="margin-top">
      <Panel header={header} className="side-section-holder">
        <div className="unstyled-list">
          <Checkbox.Group
            onChange={(valuesArray) => {
              durationQueryString = buildQueryString({
                [queryParam]: valuesArray,
              });
              console.log(durationQueryString);
              onFilterOptionsChange([header], durationQueryString);
            }}
          >
            <Space direction="vertical">
              {durations.map((duration, index) => (
                <Duration
                  key={index}
                  lable={duration.lable}
                  value={duration.value}
                />
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      </Panel>
    </Collapse>
  );
}

function Duration({ lable, value }) {
  return <Checkbox value={value}>{lable}</Checkbox>;
}

// this method takes a duration string, for ex: "01:00:00"
// and returns it in human readable format ex: 1 Hour

function toDuration(duration) {
  // if the first string is 0 then it's ignored by int parser
  const hrs = parseInt(duration.slice(0, 2));

  if (hrs < 4) return { lable: '1 - 3 Hours', value: '00:00-03:00', rank: 1 };
  if (hrs < 7) return { lable: '4 - 7 Hours', value: '04:00-07:00', rank: 2 };
  if (hrs < 18) return { lable: '8 - 16 Hours', value: '08:00-16:00', rank: 3 };
  return { lable: '17+ Hours', value: '17:00-100000:00', rank: 4 };
}

// all of these functions just to work with the stupid structred data that
// comes from the back-end, literlly backend development is worse than
// cancer, period.
function constructDurations(meta) {
  let durations = [];

  // converting it's shape from basic string values to literal objects.
  meta?.forEach((item) => durations.push(toDuration(item)));

  // making sure no repeated values
  durations = [
    ...new Map(durations.map((item) => [item['lable'], item])).values(),
  ];
  // sorting from 1-3 hours to 17+ hours based on rank
  durations = durations.sort((a, b) => a.rank - b.rank);
  return durations;
}
