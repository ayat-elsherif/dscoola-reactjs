import { css } from '@emotion/css';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Image, Input, Rate } from 'antd';
import useYallaOnlineRate from 'api-hooks/yalla-online/useYallaOnlineRate';
import OwnModal from 'components/own/OwnModal';
import { avatarImg } from 'constant/constant';
import { queryKeys } from 'services/react-query/queryKeys';

function ModalYallaOnlineRate({ open, setOpen, rateItem, lastJoin }) {
  // console.log('ModalYallaOnlineRate  rateItem', rateItem);
  const ModalYallaOnlineRateStyles = css`
    /* padding: 2rem 0 2.5rem; */
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;

    .user-img {
      width: 12.5rem;
      height: 11.5rem;
      background-color: #ccc;
      border-radius: 4px;
      position: absolute;
      top: -10rem;
      transform: translateX(-50%);
      object-fit: cover;
      /* margin-bottom: 0.6rem; */
    }
    .title {
      margin-top: 2rem;
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 1.7rem;
      color: #2a2a2a;
      text-transform: capitalize;
      text-align: center;
    }
    .sub-title {
      font-size: 1.3rem;
      line-height: 2.2rem;
      color: #7e7e7e;
      text-align: center;
    }

    .rate {
      display: flex;
      justify-content: center;
      font-weight: 600;
      font-size: 2.7rem;
      color: #f2b636;
      li {
        margin-inline-end: 0.3rem !important;
        svg {
          /* width: 2.8rem; */
        }
      }
    }

    .form {
      width: 100%;
      /* background-color: #f2b636; */
      button {
        margin: auto;
      }
    }
  `;
  const client = useQueryClient();

  const { yallaOnlineRate, yallaOnlineRateLod } = useYallaOnlineRate({
    course_id: rateItem?.course_id,
    meet_id: rateItem.id,
  });

  const onFinish = (values) => {
    const reqData = new FormData();
    reqData.append('rate', values?.rate);
    reqData.append('comment', values?.comment);
    yallaOnlineRate({
      reqData,
      onSuc: () => {
        if (lastJoin) {
          client.invalidateQueries([
            queryKeys.yallaOnlineMeeting,
            rateItem.id + '',
          ]);
        }
        setOpen(false);
      },
    });
    // yallaOnlineRate({ reqData: values, onSuc: () => setOpen(false) });
  };
  return (
    <OwnModal open={open} onCancel={() => setOpen(false)} centered width={478}>
      <div className={ModalYallaOnlineRateStyles}>
        <Image
          preview={false}
          src={rateItem?.creator?.photo_url || avatarImg}
          fallback={avatarImg}
          className="user-img"
        />
        <div className="title">{rateItem?.creator?.name}</div>
        <div className="sub-title">
          {lastJoin
            ? 'Please rate the last meeting before joining a new meeting'
            : 'Rate your experience with the group'}
        </div>
        <Form
          onFinish={onFinish}
          className="form"
          initialValues={{
            rate: 1,
          }}
        >
          <Form.Item name="rate">
            <Rate className="rate" />
          </Form.Item>
          <Form.Item name="comment">
            <Input.TextArea placeholder="Write review" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={yallaOnlineRateLod}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </OwnModal>
  );
}

export default ModalYallaOnlineRate;
