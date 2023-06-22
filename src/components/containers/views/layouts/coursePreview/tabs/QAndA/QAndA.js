import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import useQAndAList from 'api-hooks/Q&A/useQAndAList';
import OwnPagination from 'components/own/OwnPagination';
import OwnResult from 'components/own/OwnResult';
import { crtArray } from 'utils';
import HeaderWrapper from './HeaderWrapper';
import QuestionItem from './QuestionItem/QuestionItem';
import QuestionComments from './QuestionComments/QuestionComments';
import useSearchQuery from 'Hooks/utils/useSearchQuery';

function QAndA() {
  const QAndAStyles = css``;
  const { searchQueryObj } = useSearchQuery();

  const { QAndAList, QAndAListLod, QAndAPagination } = useQAndAList();
  // console.log('QAndA  QAndAList', QAndAList);

  const activeQues =
    searchQueryObj.id && QAndAList?.find((c) => c?.id === +searchQueryObj.id);

  return (
    <div className={QAndAStyles}>
      <div className="tab-wrapper">
        <HeaderWrapper question={activeQues} />
        <div className="content-wrapper">
          {QAndAListLod ? (
            <div className="questions-wrapper">
              <Row>
                {crtArray(3)?.map((_, i) => (
                  <Col key={i} span={24}>
                    <QuestionItem loading borderLess={i === 0} />
                  </Col>
                ))}
              </Row>
            </div>
          ) : !QAndAList?.length ? (
            <OwnResult
              title="No Recent Questions found"
              extra="It is a long established fact that a reader will be distracted by the readable content lorem"
            />
          ) : (
            <div className="questions-wrapper">
              <Row>
                {activeQues ? (
                  <Col span={24}>
                    <QuestionComments question={activeQues} />
                  </Col>
                ) : (
                  QAndAList?.map((el, i) => (
                    <Col key={el?.id} span={24}>
                      <QuestionItem question={el} borderLess={i === 0} />
                    </Col>
                  ))
                )}
              </Row>
              {!activeQues && <OwnPagination pagination={QAndAPagination} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QAndA;
