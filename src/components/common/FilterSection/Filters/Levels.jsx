import { Checkbox, Collapse, Space } from 'antd';
import React from 'react';
import '../FilterSection.scss';
import { buildQueryString } from '../util';

export default function Levels({
  onFilterOptionsChange,
  meta,
  header,
  queryParam,
}) {
  const { Panel } = Collapse;
  let levelQueryString = '';

  const levels = meta?.map((level) => toLevel(level));


  return (
    <Collapse defaultActiveKey={['0']} onChange={alert} className="margin-top">
      <Panel header={header} className="side-section-holder">
        <div className="unstyled-list">
          <Checkbox.Group
            onChange={(valuesArray) => {
              levelQueryString = buildQueryString({
                [queryParam]: valuesArray,
              });
              console.log(levelQueryString);
              onFilterOptionsChange([header], levelQueryString);
            }}
          >
            <Space direction="vertical">
              {levels.map((level, index) => (
                <Level lable={level.lable} value={level.value} key={index} />
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      </Panel>
    </Collapse>
  );
}

function Level({ value, lable }) {
  return <Checkbox value={value}>{lable}</Checkbox>;
}

function toLevel(level) {
  const lables = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const level_ = parseInt(level);

  return {
    lable: lables[level_],
    value: level_,
  };
}
