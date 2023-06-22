import { Switch } from 'antd';
import { useState } from 'react';
import ModalGetDecision from '../modals/ModalGetDecision';
import useCouponDeactive from 'api-hooks/module/coupon/useCouponDeactive';

function CellActivate({ status, record }) {
  const [isModalGetDecisionActive, setIsModalGetDecisionActive] =
    useState(false);

  const { couponDeactive, couponDeactiveLod } = useCouponDeactive();
  const onDeactive = () => {
    couponDeactive({
      couponId: record?.key,
      status: record.activate ? 0 : 1,
      onSuc: () => {
        setIsModalGetDecisionActive(false);
      },
    });
  };
  return (
    <>
      <Switch
        checked={status}
        onChange={(status) => {
          console.log(status);
          if (status) {
            onDeactive();
          } else {
            setIsModalGetDecisionActive(true);
          }
        }}
      />
      <ModalGetDecision
        open={isModalGetDecisionActive}
        onOk={onDeactive}
        onCancel={() => setIsModalGetDecisionActive(false)}
        title="Are You Sure ?"
        subTitle="You Want To Deactivate This Coupon"
        okText="Deactivate"
        loading={couponDeactiveLod}
      />
    </>
  );
}

export default CellActivate;
