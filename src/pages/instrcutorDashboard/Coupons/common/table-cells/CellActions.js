import { css } from '@emotion/css';
import { Button, Dropdown } from 'antd';
import useCouponDelete from 'api-hooks/module/coupon/useCouponDelete';
import { EllipsIcon } from 'assets/svg';
import { useState } from 'react';
import ModalAddCoupon from '../modals/ModalAddCoupon';
import ModalGetDecision from '../modals/ModalGetDecision';

function CellActions({ coupon }) {
  // console.log('CellActions  coupon:', coupon);
  const CellActionsStyles = css``;
  const [isModalGetDecisionDelete, setIsModalGetDecisionDelete] =
    useState(false);
  const [isModalAddCoupon, setIsModalAddCoupon] = useState(false);

  const { couponDelete, couponDeleteLod } = useCouponDelete();

  const onDelete = () => {
    couponDelete({
      couponId: coupon?.id,
      onSuc: () => {
        setIsModalGetDecisionDelete(false);
      },
    });
  };
  return (
    <>
      <div className={CellActionsStyles}>
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: 'Edit',
                onClick: () => setIsModalAddCoupon(true),
              },
              {
                key: '2',
                label: 'Delete',
                onClick: () => setIsModalGetDecisionDelete(true),
              },
            ],
            style: { width: 128 },
          }}
          placement="bottomRight"
          arrow
          trigger={['click']}
        >
          <Button type="link" icon={<EllipsIcon />} />
        </Dropdown>
      </div>
      <ModalGetDecision
        open={isModalGetDecisionDelete}
        onOk={onDelete}
        onCancel={() => setIsModalGetDecisionDelete(false)}
        title="Are You Sure ?"
        subTitle="You Want To Delete This Coupon"
        okText="Delete"
        loading={couponDeleteLod}
      />
      <ModalAddCoupon
        open={isModalAddCoupon}
        setOpen={setIsModalAddCoupon}
        editCoupon={coupon}
      />
    </>
  );
}

export default CellActions;
