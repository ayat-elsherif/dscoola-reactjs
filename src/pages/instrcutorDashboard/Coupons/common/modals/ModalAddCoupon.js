import { css } from '@emotion/css';
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import useCourseList from 'api-hooks/courses/useCourseList';
import useCouponAdd from 'api-hooks/module/coupon/useCouponAdd';
import useCouponEdit from 'api-hooks/module/coupon/useCouponEdit';
import { DownArrowIcon } from 'assets/svg';
import OwnModal from 'components/own/OwnModal';
import dayjs from 'dayjs';
import { useState } from 'react';
import ModalConfirm from './ModalConfirm';

function ModalAddCoupon({ open, setOpen, editCoupon }) {
  // console.log('ModalAddCoupon  editCoupon:', editCoupon);
  const ModalAddCouponStyles = css`
    .form {
      label {
        font-weight: 400;
        font-size: 1.5rem;
      }
      input {
        width: 100%;
      }

      .btn-publish {
        margin-left: auto;
      }
    }
  `;

  const [form] = Form.useForm();

  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const { couponAdd, couponAddLod } = useCouponAdd();
  const { couponEdit, couponEditLod } = useCouponEdit();
  const { courseList, courseListLod } = useCourseList();
  const [isPercentage, setIsPercentage] = useState(false);

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    // console.log('onFinish  values', values);

    const valuesObj = {
      ...values,
      start_date: dayjs(values.start_date).format('YYYY-MM-DD HH:mm:ss'),
      end_date: dayjs(values.end_date).format('YYYY-MM-DD HH:mm:ss'),
    };
    const fd = new FormData();
    for (const key in valuesObj) {
      fd.append(key, valuesObj[key]);
    }

    if (editCoupon) {
      couponEdit({
        couponId: editCoupon?.id,
        reqData: fd,
        onSuc: (res) => {
          // console.log('couponAdd  res:', res);
          onClose();
        },
      });
    } else {
      couponAdd({
        reqData: fd,
        onSuc: (res) => {
          // console.log('couponAdd  res:', res);
          onClose();
        },
      });
    }
  };
  return (
    <>
      <OwnModal
        open={open}
        // onCancel={() => setOpen(false)}
        title={editCoupon ? 'Edit Coupon' : 'Add Coupon'}
        width={484}
        className={ModalAddCouponStyles}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          form={form}
          initialValues={
            editCoupon
              ? {
                  ...editCoupon,
                  start_date: dayjs(editCoupon?.start_date),
                  end_date: dayjs(editCoupon?.end_date),
                }
              : undefined
          }
          className="input-holder form"
        >
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Coupon Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Coupon Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="limit"
                label="Limit Use"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Limit Use" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Discount Type"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Discount Type"
                  allowClear={false}
                  suffixIcon={<DownArrowIcon />}
                  onChange={(value) => setIsPercentage(+value === 2)}
                  options={[
                    {
                      value: 1,
                      label: 'Fixed Amount',
                    },
                    {
                      value: 2,
                      label: 'Percentage',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="value"
                label={isPercentage ? 'Percentage Off' : 'discount value'}
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="discount value" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item
                name="start_date"
                label="start date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={(current) => {
                    // Can not select days before today and today
                    return current && current < dayjs().startOf('day');
                  }}
                  // format="MM/DD/YYYY"
                  placeholder="MM/DD/YYYY"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="end_date"
                label="end date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={(current) => {
                    // Can not select days before today and today
                    return current && current < dayjs().startOf('day');
                  }}
                  placeholder="MM/DD/YYYY"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item
                name="min_purchase"
                label="Min Purchase"
                // rules={[{ required: true }]}
              >
                <Input placeholder="Min Purchase" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="max_discount"
                label="Max Discount"
                // rules={[{ required: true }]}
              >
                <Input placeholder="Max Discount" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="course_id"
            label="Course Name"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Course Name"
              allowClear={false}
              suffixIcon={<DownArrowIcon />}
              loading={courseListLod}
              options={courseList?.map((el) => ({
                value: el?.id,
                label: el?.title,
              }))}
            />
          </Form.Item>
          <Space
            size={14}
            style={{ justifyContent: 'flex-end', marginTop: 20 }}
          >
            <Button type="default" className="btn-publish" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-publish"
              loading={couponAddLod || couponEditLod}
            >
              {editCoupon ? 'Update' : 'Add'}
            </Button>
          </Space>
        </Form>
      </OwnModal>
      <ModalConfirm
        open={isModalConfirmOpen}
        onOk={() => setIsModalConfirmOpen(false)}
        title="Done!"
        subTitle={`Your Coupon has been successfully ${
          editCoupon ? 'Updated' : 'Published'
        }`}
      />
    </>
  );
}

export default ModalAddCoupon;
