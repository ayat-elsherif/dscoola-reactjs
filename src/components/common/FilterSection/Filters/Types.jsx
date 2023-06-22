import { Checkbox, Collapse, Space } from 'antd';
import React from 'react';
import '../FilterSection.scss';
import { buildQueryString } from '../util';

export default function Types({
  onFilterOptionsChange,
  queryParam,
  meta,
  header,
}) {
  const { Panel } = Collapse;
  let typeQueryString = '';
  return (
    <Collapse defaultActiveKey={['0']} onChange={alert} className="margin-top">
      <Panel header={header} className="side-section-holder">
        <div className="unstyled-list">
          <Checkbox.Group
            onChange={(valuesArray) => {
              typeQueryString = buildQueryString({
                [queryParam]: valuesArray,
              });
              console.log(typeQueryString);
              onFilterOptionsChange([header], typeQueryString);
            }}
          >
            <Space direction="vertical">
              {meta.map((type, index) => (
                <Type type={type} key={index} />
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      </Panel>
    </Collapse>
  );
}

function Type({ type }) {
  return <Checkbox value={type}>{toReadableType(type)}</Checkbox>;
}

// it only capitilize the first letter
function toReadableType(type) {
  const type_ = type.charAt(0).toUpperCase() + type.slice(1);
  return type_;
}
