import { Col, Modal, Row, Tooltip } from 'antd';
import { DeleteIcon, EditIcon, InfoIcon } from 'assets/svg';
import dayjs from 'dayjs';
import useApi from 'network/useApi';
import DeleteModal from 'pages/dashboard/myProfile/components/workExperiences/deleteModal';

import React from 'react';
import { useState } from 'react';
import queryClient from 'services/react-query/queryClient';
import Bundel from './bundel';
// import BundleUpdate from './bundleUpdate';

const ReturnedBundels = ({ Bundles }) => {
  const api = useApi();
  const [openDeleteBundle, setOpenDeleteBundlel] = useState(false);
  const [openEditBundle, setOpenEditBundlel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const RecurringType = (type) => {
    if (type === 1) {
      return 'Day(s)';
    } else if (type === 2) {
      return 'Week(s)';
    } else {
      return 'Month(s)';
    }
  };
  return (
    <>
      {Bundles?.data?.map((i, index) => {
        return (
          <>
            <Row gutter={[8]} className="pt-4">
              <Col>
                <h4>Course bundles</h4>
              </Col>
              <Col>
                {' '}
                <Tooltip title="Student have to collect this score in percent for the pass this quiz.">
                  <InfoIcon />
                </Tooltip>
              </Col>
            </Row>

            <Row
              key={index}
              justify="space-between"
              className="returned-bundels mb-4"
            >
              <Col span={24} className="pb-4">
                <Row gutter={[16, 16]}>
                  <Col>
                    <h4>Bundle Group : {index + 1}</h4>
                  </Col>
                  <Col className="bundles-actions">
                    <EditIcon
                      onClick={() => {
                        setOpenEditBundlel(true);
                        setEditId(i.id);
                      }}
                      className="action-icon"
                    />
                    <DeleteIcon
                      onClick={() => setOpenDeleteBundlel(true)}
                      className="action-icon"
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                {' '}
                {dayjs(i.start_date).format('MMM DD, YYYY')} -{' '}
                {i.end_date
                  ? dayjs(i.end_date).format('MMM DD, YYYY')
                  : i.end_times + ' ' + 'Occurrences'}
              </Col>
              <Col className="bundel-divider"> </Col>
              <Col>{i.start_time.slice(0, -3)}</Col>
              <Col className="bundel-divider"> </Col>
              <Col>{Math.trunc(i.duration / 60) + ' ' + 'hour'}</Col>
              <Col className="bundel-divider"> </Col>
              <Col>
                Repeat Every {i.repeat_interval} {RecurringType(i.type)}
              </Col>
              <Col className="bundel-divider"> </Col>
              <Col>limit number of attends : {i.max_attends}</Col>
              <DeleteModal
                open={openDeleteBundle}
                header="Are You sure?"
                body="You Want To Delete This Bundle?"
                handleCancel={() => setOpenDeleteBundlel(false)}
                loading={loading}
                handleDelete={() => {
                  setLoading(true);
                  api
                    .delete(`lecture/bundle/${i.id}`)
                    .then(() => {
                      setLoading(false);
                      queryClient.invalidateQueries([`get-bundles`]);
                      setOpenDeleteBundlel(false);
                    })
                    .catch(() => {
                      setLoading(false);
                      setOpenDeleteBundlel(false);
                    });
                }}
              />
              <Modal
                title="Edit Bundle"
                destroyOnClose
                open={openEditBundle}
                onCancel={() => setOpenEditBundlel(false)}
                footer={null}
                width={900}
              >
                <Bundel close={() => setOpenEditBundlel(false)} id={editId} />
              </Modal>
            </Row>
          </>
        );
      })}
    </>
  );
};

export default ReturnedBundels;
