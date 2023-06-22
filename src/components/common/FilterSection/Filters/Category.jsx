import { Checkbox, Collapse, Space } from 'antd';
import React from 'react';
import '../FilterSection.scss';
import { buildQueryString } from '../util';

export default function Category({
  onFilterOptionsChange,
  queryParam,
  meta,
  header,
}) {
  const { Panel } = Collapse;
  let categoryQueryString = '';

  return (
    <Collapse defaultActiveKey={['0']} className="margin-top">
      <Panel header={header} className="side-section-holder">
        <div className="unstyled-list">
          <Checkbox.Group
            onChange={(valuesArray) => {
              console.log('valuesArray:', valuesArray);
              categoryQueryString = buildQueryString({
                [queryParam]: valuesArray,
              });
              // console.log(categoryQueryString);
              onFilterOptionsChange([header], categoryQueryString);
            }}
          >
            <Space direction="vertical">
              {meta.map((item, index) => (
                <Checkbox key={index} value={item.id}>
                  {item.category_name || item?.name}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      </Panel>
    </Collapse>
  );
}
