import React from 'react';
import { Radio, Form, Row, Skeleton } from 'antd';
import dayjs from 'dayjs';
import '../../style.scss';
import useApi from 'network/useApi';
import { useQuery } from '@tanstack/react-query';

export default function DatesAvailability({
  headingTitle,
  isModal,
  myCourse,
  handleBundleId,
  // Bundles,
  // isLoading,
}) {
  console.log(myCourse, 'dslkngwe');
  const RecurringWeekdays = (type) => {
    if (type === 1) {
      return 'Sun';
    } else if (type === 2) {
      return 'Mon';
    } else if (type === 3) {
      return 'Tue';
    } else if (type === 4) {
      return 'Wed';
    } else if (type === 5) {
      return 'Thu';
    } else if (type === 6) {
      return 'Fri';
    } else {
      return 'Sat';
    }
  };

  const RecurringType = (type) => {
    if (type === 1) {
      return 'First';
    } else if (type === 2) {
      return 'Secound';
    } else if (type === 3) {
      return 'Third';
    } else if (type === 4) {
      return 'Fourth';
    } else {
      return 'Last';
    }
  };
  const api = useApi();
  const { data: Bundles, isLoading } = useQuery([`get-bundles`], () => {
    return api.get(
      `lecture/course/${myCourse?.id}/setup-details/bundle?order_by=id,asc`,
    );
  });

  const fullAvailBundles = Bundles?.data?.map((item, i) => {
    console.log(item, 'Dfverv');
    if (isModal) {
      return (
        <div className="bunble-list">
          {' '}
          <div
            className={
              !item.enroll_allowed
                ? 'disabled availability-item'
                : 'availability-item'
            }
          >
            <Radio
              value={item.id}
              onChange={(e) => {
                handleBundleId(e, item.id);
              }}
              style={{ width: '100%' }}
              disabled={!item.enroll_allowed}
            >
              <Row className="row align-items-center">
                <div className="col-lg-8 col-16">
                  <div className="d-flex align-items-center">
                    <span>{dayjs(item.start_date).format('MMM DD')}</span>
                    <span className="separator">|</span>
                    <span>
                      {item.type === 1 &&
                        `Every ${item.repeat_interval} Days until the end of the course`}
                      {item.type === 2 &&
                        `${item.weekly_days.split(',').map((day) => {
                          return RecurringWeekdays(+day) + ' ';
                        })}`}
                      {item.type === 3 &&
                        ` ${
                          item.monthly_day
                            ? `Every mounth on the ${item.monthly_day}`
                            : ` Every ${RecurringWeekdays(
                                item.monthly_week_day,
                              )} of the ${RecurringType(
                                item.monthly_week,
                              )} week`
                        } of the month`}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 col-8 text-end">
                  Time - {item.start_time.slice(0, -3)} to{' '}
                  {item.end_time.slice(0, -3)}
                </div>
              </Row>
            </Radio>
          </div>
          <div className="divider-bundles"></div>
        </div>
      );
    } else {
      return (
        <div className="bunble-list">
          <div
            className={
              !item.enroll_allowed
                ? 'disabled availability-item'
                : 'availability-item'
            }
          >
            <div className=" availability-item-row">
              <div className="availability-item-date">
                <span>{dayjs(item.start_date).format('MMM DD')}</span>
                <span className="separator">|</span>
                <span>
                  {item.type === 1 &&
                    `Every ${item.repeat_interval} Days until the end of the course`}
                  {item.type === 2 &&
                    `${item.weekly_days.split(',').map((day) => {
                      return RecurringWeekdays(+day) + ' ';
                    })}`}
                  {item.type === 3 &&
                    ` ${
                      item.monthly_day
                        ? `Every mounth on the ${item.monthly_day}`
                        : ` Every ${RecurringWeekdays(
                            item.monthly_week_day,
                          )} of the ${RecurringType(item.monthly_week)} week`
                    } of the month`}
                </span>
                <span className="separator">|</span>
                <div>
                  Time - {item.start_time.slice(0, -3)} to{' '}
                  {item.end_time.slice(0, -3)}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="divider-bundles"></div> */}
        </div>
      );
    }
  });

  return Bundles?.data?.length ? (
    <div className="datesAvailability">
      <h4>{headingTitle}</h4>
      <div className="datesAvailability-container">
        {isModal ? (
          <Form>
            <Form.Item
              style={{ 'margin-bottom': '0px' }}
              name="radio-group"
              rules={[{ required: true, message: 'Please pick an item!' }]}
            >
              <Radio.Group>{fullAvailBundles}</Radio.Group>
            </Form.Item>
          </Form>
        ) : (
          <>{isLoading ? <Skeleton active></Skeleton> : fullAvailBundles}</>
        )}
      </div>
    </div>
  ) : null;
}
