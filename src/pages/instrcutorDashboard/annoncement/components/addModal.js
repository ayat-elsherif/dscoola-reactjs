import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import Loading from 'components/common/dashboard/shared-components/Loading';

import OwnTextEditor from 'components/own/OwnTextEditor/OwnTextEditor';
import useS3Upload from 'Hooks/utils/useS3Upload';
import useApi from 'network/useApi';
import { normalizeDataToFields } from 'pages/dashboard/myProfile/components/personalInformation/Helpers';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../index.scss';

const AddModal = ({ close, id }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [fields, setFields] = useState([]);
  const [record, setRecord] = useState(null);
  const { s3Upload } = useS3Upload();
  const { currentUser } = useSelector((state) => state?.user);
  const instructorId = currentUser?.user_id;
  var couesesArr = [];
  const x = () => ({});

  const onFinish = async (values) => {
    let file = null;
    if (record?.file) {
      file = await s3Upload(record?.file);
    }
    setLoading(true);
    values.description = description;
    values.voice_url = file === null ? '' : file;

    id
      ? api
          .put(`instructor/announcement/${id?.id}`, values)
          .then(() => {
            queryClient.invalidateQueries([`get-annoncement`]);
            form.resetFields();
            close();
            setRecord(false);
            setLoading(false);
            setDescription(null);
            message.success('Edited successfully');
          })
          .catch(() => {
            setLoading(false);
            message.error('something went wrong');
          })
      : api
          .post('instructor/announcement', values)
          .then(() => {
            queryClient.invalidateQueries([`get-annoncement`]);

            close();
            setDescription(null);
            form.resetFields();
            setLoading(false);
            setRecord(false);
            message.success('add successfully');
          })
          .catch(() => {
            setLoading(false);
            message.error('something went wrong');
          });
  };
  const { data: Courses, isLoading } = useQuery([`instructor-courses`], () => {
    return api.get(
      `courses/auth/filter?perpage=1000&instructor[]=${instructorId}`,
    );
  });
  const onnGetAnnById = (data) => {
    setFields(normalizeDataToFields(data?.data));
    setDescription(data?.data?.description);
    setRecord({ url: data?.data?.voice_url });
  };

  const { isLoading: returnedDataLoading } = useQuery(
    [`get-ann-by-id`, id?.id],
    () => {
      return api.get(`instructor/announcement/${id.id}`);
    },
    {
      disabled: !!id,
      cacheTime: 0,
      refetchOnMount: true,
      staleTime: 0,
      onSuccess: onnGetAnnById,
    },
  );

  Courses?.data?.forEach((item) => {
    couesesArr.push({ label: item.title, value: item.id });
    console.log(couesesArr, 'ewpojfpwoef');
  });

  return (
    <>
      {returnedDataLoading && id ? (
        <Loading />
      ) : (
        <Form
          fields={fields}
          form={form}
          className="add-certificate-form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            className="select-course"
            label="Choose Course"
            name="course_id"
            rules={[
              {
                required: true,
                message: 'Please Choose Course!',
              },
            ]}
          >
            <Select
              options={couesesArr}
              size="large"
              loading={isLoading}
              placeholder="Ui/Ux designer"
            />
          </Form.Item>
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input style={{ height: '40px' }} placeholder=" title" />
          </Form.Item>
          <Form.Item label="Description">
            <OwnTextEditor
              textEdit={description}
              setTextEdit={setDescription}
              placeholder="Enter Description"
              record={record}
              setRecord={setRecord}
              isRecordable
              modal
            />
          </Form.Item>

          <Row gutter={[16, 16]} justify="end" className="pt-5">
            <Col>
              <Button
                onClick={() => {
                  close();
                  form.resetFields();
                  setDescription(null);
                  setRecord(false);
                }}
              >
                Cancle
              </Button>
            </Col>
            <Form.Item>
              <Col>
                <Button loading={loading} type="primary" htmlType="submit">
                  {id ? 'Edit' : 'Create'}
                </Button>
              </Col>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
};

export default AddModal;
