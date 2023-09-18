import { css } from '@emotion/css';
import { Breadcrumb, Button, Col, Input, Row, Select } from 'antd';
import { ArrowDownIcon, ArrowRightIcon, Searchcon } from 'assets/svg';
import { useEffect, useState } from 'react';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
import { Link, useParams } from 'react-router-dom';
import ModalCrsQuestion from 'components/modals/ModalCrsQuestion';
import { useSelector } from 'react-redux';
import useDebounce from 'Hooks/utils/useDebounce';

function HeaderWrapper({ question }) {
  // console.log('HeaderWrapper  question:', question);
  const HeaderWrapperStyles = css`
    .breadcrumb {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 2.4rem;
      color: #6a6f73;

      li {
      }

      a {
        display: inline-block;
        color: #7e59d1;
        background: unset !important;
        margin-top: -4px;
      }

      .ant-breadcrumb-separator {
        font-size: 1.4rem;
        margin-inline: 0.6rem;
      }
    }
    .btn-ask-new {
      width: 21.5rem;
      height: 4rem;
    }
    .filter-set {
      @media screen and (max-width: 575px) {
        flex-direction: column;
        align-items: flex-start;
        margin-top: 2rem;
        .ant-col {
          // margin-bottom: 3rem;
          flex: 1 1 auto !important;
          width: 100%;
          .input.select {
            margin-bottom: 3rem;

            .ant-select-selector {
              height: 5rem;
            }
          }
          .input.search {
            height: 5rem;
            margin-bottom: 2.5rem;
          }
        }
      }
    }
    .input {
      height: 4rem;
      background-color: #f3f3f4;
      &.search {
        svg {
          width: 1.1rem;
          margin-inline-end: 3px;
        }
        input {
          background-color: #f3f3f4;
          &::placeholder {
            font: normal normal normal 1.4rem/2rem Poppins;
            letter-spacing: 0px;
            color: #6a6f73;
          }
        }
      }
      &.select {
        display: flex;
        align-items: center;
        .ant-select-selector {
          height: 4rem;
          background-color: #f3f3f4;
          font-size: 1.4rem;

          .ant-select-selection-placeholder,
          .ant-select-selection-item {
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            letter-spacing: 0px;
            color: #6a6f73;
          }
        }
        .ant-select-arrow {
          svg {
            width: 0.9rem;
          }
        }
      }
    }
  `;
  const { currentUser } = useSelector((state) => state?.user);
  // console.log('HeaderWrapper  currentUser', currentUser);

  const params = useParams();
  const [isModalAskQusOpen, setIsModalAskQusOpen] = useState(false);
  const { searchQueryStr, searchQueryObj, setSearchQuery } = useSearchQuery();
  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounce = useDebounce(searchValue, 500);

  useEffect(() => {
    const newQueryObj = {
      ...searchQueryObj,
      title: `*${searchValueDebounce}*`,
    };

    setSearchQuery(newQueryObj);
  }, [searchValueDebounce]);

  const onSort = (sort) => {
    // // console.log('onChange  sort', sort);
    const queryObj = { ...searchQueryObj };
    if (!sort) {
      delete queryObj.order_by;
    } else {
      queryObj.order_by = sort;
    }
    setSearchQuery(queryObj);
    return null;
  };

  // const onSearch = ({ target }) => {
  //   // // console.log('onSearch  target', target.value);
  //   const newQueryObj = {
  //     ...searchQueryObj,
  //     title: `*${target.value}*`,
  //   };
  //   setSearchQuery(newQueryObj);
  //   return {};
  // };
  const onFilter = (value) => {
    // console.log('onFilter  value', value);
    let newQueryStr = searchQueryStr;
    // RESET FILTER
    newQueryStr = newQueryStr.replace(`user_id=${currentUser?.user_id}`, '');
    newQueryStr = newQueryStr.replace('comments_count=0', '');

    // ADD NEW FILTER
    newQueryStr = newQueryStr + '&' + value;

    setSearchQuery(newQueryStr);
    return {};
  };
  return (
    <>
      <div className={HeaderWrapperStyles}>
        <Row gutter={[0, 18]}>
          <Col span={24}>
            <Row
              gutter={[0, 30]}
              align="middle"
              justify="space-between"
              wrap={false}
            >
              <Col>
                <Breadcrumb
                  separator={<ArrowRightIcon />}
                  className="breadcrumb"
                >
                  <Breadcrumb.Item>
                    <Link
                      to={`/course/${params?.course_slug}/${params?.course_id}/section/${params?.section_id}/preview/${params?.lecture_id}/Q&A`}
                    >
                      All Questions
                    </Link>
                  </Breadcrumb.Item>
                  {question && (
                    <Breadcrumb.Item>{question?.title}</Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </Col>
              {!question && (
                <Col>
                  <Button
                    type="primary"
                    className="btn-ask-new"
                    onClick={() => setIsModalAskQusOpen(true)}
                  >
                    Ask new questions
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
          {!question && (
            <Col span={24}>
              <Row
                gutter={16}
                align="middle"
                justify="space-between"
                wrap={false}
                className="filter-set"
              >
                <Col flex="27.1rem">
                  <Input
                    prefix={<Searchcon />}
                    defaultValue={searchQueryObj.title?.replaceAll('*', '')}
                    placeholder="Search for any question"
                    className="input search"
                    onChange={({ target }) => setSearchValue(target.value)}
                  />
                </Col>
                <Col flex="auto">
                  <Select
                    placeholder="Filter questions by"
                    suffixIcon={<ArrowDownIcon />}
                    className="input select"
                    onChange={onFilter}
                    // size="large"
                    dropdownStyle={{
                      fontSize: '1.1rem',
                    }}
                    dropdownMatchSelectWidth={200}
                    options={[
                      {
                        value: '',
                        label: 'All question',
                      },
                      {
                        value: `user_id=${currentUser?.user_id}`,
                        label: 'Question I asked',
                      },
                      {
                        value: 'comments_count=0',
                        label: 'Question no response',
                      },
                    ]}
                  />
                </Col>
                <Col flex="auto">
                  <Select
                    placeholder="Sort questions by"
                    suffixIcon={<ArrowDownIcon />}
                    className="input select"
                    allowClear
                    dropdownMatchSelectWidth={200}
                    onChange={onSort}
                    options={[
                      {
                        value: 'id,desc',
                        label: 'Sort by most recent',
                      },
                      {
                        value: 'comments_count,desc',
                        label: 'Sort by recommended',
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>
      <ModalCrsQuestion
        open={isModalAskQusOpen}
        setOpen={setIsModalAskQusOpen}
      />
    </>
  );
}

export default HeaderWrapper;
