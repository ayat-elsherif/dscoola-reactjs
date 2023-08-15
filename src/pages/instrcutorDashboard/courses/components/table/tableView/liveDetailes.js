import { Button, Col, Row, message } from 'antd';
import React, { useState } from 'react';
import './index.scss';
import dayjs from 'dayjs';
import { CopyIcon } from 'assets/svg';
import { Link } from 'react-router-dom';
import { limitedText } from 'utils';
const LiveDetailes = ({ data, onClose }) => {
  const [textArea, setTextArea] = useState('THis is text');

  const copyText = () => {
    navigator.clipboard.writeText(textArea);
  };
  return (
    <Row gutter={[16, 16]} className="pt-4">
      <Col span={24}>
        <span className="lable">Course Name : </span>
        <span className="value">{`${data.title}`}</span>
      </Col>
      <Col span={24}>
        <span className="lable">N of lectures : </span>
        <span className="value">{`${data.lecture_count} Lectures`}</span>
      </Col>
      <Col span={24}>
        <span className="lable"> Created at : </span>
        <span className="value">{`${dayjs(data.created_at).format(
          'D MMMM YYYY',
        )}`}</span>
      </Col>
      <Col span={24}>
        <span className="lable"> Live sessions :</span>
      </Col>
      <Col span={24}>
        <Row className="links-row" gutter={[16, 16]}>
          {data?.content.map((link) => {
            return (
              <Col key={link.id} span={24} className="links-container">
                <Row justify="space-between">
                  <Col>
                    <a target="blank" href={link.zoom_meeting_url+"/start"}>
                      {limitedText(link.zoom_meeting_url, 50)}
                    </a>
                  </Col>
                  <Col>
                    <CopyIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigator.clipboard.writeText(link.zoom_meeting_url);
                        message.success('Copied meeting link');
                      }}
                    />
                  </Col>
                </Row>
                <Row style={{ fontSize: '12px' }}>
                  {dayjs(link.start_date).format('D MMMM YYYY')}
                </Row>
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col span="24">
        <Row justify="center">
          <Button type="primary" onClick={() => onClose()}>Ok</Button>
        </Row>
      </Col>
    </Row>
  );
};

export default LiveDetailes;
