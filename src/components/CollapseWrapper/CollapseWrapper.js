import { css } from '@emotion/css';
import { Collapse } from 'antd';

const { Panel } = Collapse;

function CollapseWrapper({ title, items, cols = 1 }) {
  const CollapseWrapperStyles = css`
    margin: 3rem 0;
    padding: 2rem 0;
    .sec-title {
      margin-bottom: 3rem;
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 2rem;
      color: #2a2a2a;
      text-transform: capitalize;
    }
    .collapse-grid {
      column-count: ${cols};
      column-gap: 2rem;
      .ant-collapse-item {
        display: inline-block;
        width: 100%;
        .ant-collapse-header {
          .ant-collapse-expand-icon {
            span {
              background: unset;
              svg {
                color: #2a2a2a;
              }
            }
          }
          .ant-collapse-header-text {
            font-weight: 500;
            color: #2a2a2a;
            text-transform: capitalize;
          }
        }
      }
    }
  `;

  return (
    <div className={CollapseWrapperStyles}>
      <div className="sec-title">{title}</div>

      <Collapse className="collapse-grid" accordion expandIconPosition="end">
        {items?.map((item, i) => (
          <Panel header={item.title} key={i}>
            {item.children}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
  //   return (
  //     <div className={CollapseWrapperStyles}>
  //       <div className="sec-title">{title}</div>
  //       <Collapse>
  //         <Row>
  //           {items?.map((item, i) => (
  //             <Col key={i}>
  //               <Collapse >
  //                 <Panel header={item.title} key={i}>
  //                   <p>
  //                     <Link to="faq/:id">
  //                       Where can I see the status of my refund?
  //                     </Link>
  //                   </p>
  //                   <p>
  //                     <Link to="/">Where can I see the status of my refund?</Link>
  //                   </p>
  //                   <p>
  //                     <Link to="/">Where can I see the status of my refund?</Link>
  //                   </p>
  //                   <p>
  //                     <Link to="/">Where can I see the status of my refund?</Link>
  //                   </p>
  //                 </Panel>
  //                 <Panel header={item.title} key={i}>
  //                   <p>
  //                     <Link to="faq/:id">
  //                       Where can I see the status of my refund?
  //                     </Link>
  //                   </p>
  //                   <p>
  //                     <Link to="/">Where can I see the status of my refund?</Link>
  //                   </p>
  //                   <p>
  //                     <Link to="/">Where can I see the status of my refund?</Link>
  //                   </p>
  //                   <p>
  //                     <Link to="/">Where can I see the status of my refund?</Link>
  //                   </p>
  //                 </Panel>
  //               </Collapse>
  //             </Col>
  //           ))}
  //         </Row>
  //       </Collapse>
  //     </div>
  //   );
}

export default CollapseWrapper;
