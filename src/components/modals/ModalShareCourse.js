import { css } from '@emotion/css';
import { Button, Col, Form, Input, Row } from 'antd';
import OwnModal from 'components/own/OwnModal';
import { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';
import {
  facebookColofulIcon,
  linkedColorfulIcon,
  telegramColofulIcon,
  twitterColorfulIcon,
  WhatsappColorfulIcon,
} from 'SVGs';

function ModalShareCourse({ open, onCancel, title }) {
  const ModalShareCourseStyles = css`
    .input-group {
      input {
        width: calc(100% - 11rem);
        height: 4.5rem;
      }
      button {
        min-width: auto;
        width: 11rem;
        height: 4.5rem;
        padding: 0;
        span {
          font-weight: 500;
          font-size: 1.5rem;
          text-transform: capitalize;
        }
      }
    }
    .share-icons-wrapper {
      margin-top: 2rem;
      svg {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  `;

  const [linkToCopy] = useState(window.location.href);
  const [copyLinkText, setCopyLinkText] = useState('copy link');
  const copyShareLink = async () => {
    await navigator.clipboard
      .writeText(linkToCopy)
      .then(setCopyLinkText('link copied'));
  };
  return (
    <OwnModal
      open={open}
      onCancel={onCancel}
      centered
      width={613}
      title={title}
    >
      <div className={ModalShareCourseStyles}>
        <Input.Group compact className="input-group">
          <Input disabled value={linkToCopy} />
          <Button type="primary" onClick={copyShareLink}>
            {copyLinkText}
          </Button>
        </Input.Group>

        <div className="share-icons-wrapper">
          <Row gutter={20} align="middle" justify="center">
            <Col>
              <FacebookShareButton
                url={linkToCopy}
                quote="try to see article 1"
              >
                {facebookColofulIcon}
              </FacebookShareButton>
            </Col>
            <Col>
              <TwitterShareButton
                url={linkToCopy}
                quote="try to see article 1"
                hashtag="react-"
              >
                {twitterColorfulIcon}
              </TwitterShareButton>
            </Col>
            <Col>
              <WhatsappShareButton
                url={linkToCopy}
                quote="try to see article 1"
              >
                {WhatsappColorfulIcon}
              </WhatsappShareButton>
            </Col>
            <Col>
              <LinkedinShareButton
                url={linkToCopy}
                quote="try to see article 1"
              >
                {linkedColorfulIcon}
              </LinkedinShareButton>
            </Col>
            <Col>
              <TelegramShareButton
                url={linkToCopy}
                quote="try to see article 1"
              >
                {telegramColofulIcon}
              </TelegramShareButton>
            </Col>
          </Row>
        </div>
      </div>
    </OwnModal>
  );
}

export default ModalShareCourse;
