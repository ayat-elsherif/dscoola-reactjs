import { Switch, Table } from 'antd';
import useApi from 'Hooks/network/useApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './index.scss';

const CourseList = () => {
  const { currentUser } = useSelector((state) => state?.user);
  const [courseList, setCourseList] = useState();
  const api = useApi();
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Courses List',
      dataIndex: 'course_name',
    },
    {
      title: 'Price',
      dataIndex: 'price_plan',
    },

    {
      title: 'Activate',
      dataIndex: 'activate',
      render: (_, elem) => {
        return (
          <Switch
            checked={elem.is_active === 1}
            onChange={(checked) => {
              api.post(
                `appointment/approve/ono/course/${elem?.course_id}/toggle`,
              );
            }}
          />
        );
      },
    },
  ];

  const handleFetchList = () => {
    api
      .get(
        `appointment/list?instructor_id=${currentUser?.user_id}&perpage=100000?`,
      )
      .then((res) => {
        setCourseList(res?.data?.list);
      });
  };

  useEffect(() => {
    handleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="course-list-table">
      <Table
        pagination={false}
        columns={columns}
        dataSource={courseList}
        bordered
      />
    </div>
  );
};

export default CourseList;
