import { css } from '@emotion/css';
import { Button, Col, Input, Row, Select } from 'antd';
import { ArrowDownIcon, Searchcon } from 'assets/svg';
import { useEffect, useState } from 'react';
import useSearchQuery from 'Hooks/utils/useSearchQuery';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import ModalMeeting from 'components/modals/ModalMeeting';
import useDebounce from 'Hooks/utils/useDebounce';

function HeaderWrapper() {
  const HeaderWrapperStyles = css`
    margin-bottom: 2rem;
    .header-title {
      font-weight: 500;
      font-size: 1.8rem;
      color: #6a6f73;
    }
    .btn-add-new {
      width: 21.5rem;
      height: 4rem;
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
  // const { currentUser } = useSelector((state) => state?.user);
  // // // console.log('HeaderWrapper  currentUser', currentUser);

  // const params = useParams();
  const [isModalMeetingOpen, setIsModalMeetingOpen] = useState(false);
  const { searchQueryObj, setSearchQuery } = useSearchQuery();

  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounce = useDebounce(searchValue, 500);

  useEffect(() => {
    const newQueryObj = {
      ...searchQueryObj,
      topic: searchValueDebounce,
    };

    setSearchQuery(newQueryObj);
  }, [searchValueDebounce]);

  const onFilter = (value) => {
    // console.log('onFilter  value', value);
    const newQueryObj = searchQueryObj;
    if (value) {
      newQueryObj.state = value;
    } else {
      delete newQueryObj.state;
    }

    setSearchQuery(newQueryObj);
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
                <div className="header-title">yalla online groups</div>
              </Col>
              <Col>
                <Button
                  type="primary"
                  className="btn-add-new"
                  onClick={() => setIsModalMeetingOpen(true)}
                >
                  Create New Meeting
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={16}
              align="middle"
              justify="space-between"
              wrap={false}
            >
              <Col flex="auto">
                <Input
                  prefix={<Searchcon />}
                  defaultValue={searchQueryObj.topic}
                  placeholder="Search for any group"
                  className="input search"
                  onChange={({ target }) => setSearchValue(target.value)}
                />
              </Col>
              <Col flex="215px">
                <Select
                  placeholder="Filter groups by"
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
                      label: 'All meeting',
                    },
                    {
                      value: `1`,
                      label: 'Upcoming',
                    },
                    {
                      value: `2`,
                      label: 'Done',
                    },
                    {
                      value: '3',
                      label: 'Expired',
                    },
                  ]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <ModalMeeting open={isModalMeetingOpen} setOpen={setIsModalMeetingOpen} />
    </>
  );
}

export default HeaderWrapper;
