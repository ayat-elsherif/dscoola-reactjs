import { Collapse } from 'antd';
import { RefinementList } from 'react-instantsearch-dom';

export default function AlgoliaFilterSection({ filterList }) {
  const { Panel } = Collapse;

  return (
    <aside className="side-wrapper">
      <div className="side-content">
        <Collapse defaultActiveKey={['0']} className="margin-top">
          {filterList?.map((filter) => (
            <Panel header={filter?.header} className="side-section-holder">
              <div className="unstyled-list">
                <RefinementList attribute={filter?.attribute} />
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </aside>
  );
}
