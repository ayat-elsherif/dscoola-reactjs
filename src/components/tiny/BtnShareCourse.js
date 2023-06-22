import { css, cx } from '@emotion/css';
import { Button } from 'antd';
import { ShareColorIcon } from 'assets/svg';
import ModalShareCourse from 'components/modals/ModalShareCourse';
import { useState } from 'react';

function BtnShareCourse({ inline }) {
  const BtnShareCourseStyles = css`
    min-width: 10.5rem;
    padding: 0;
    font-size: 1.4rem;
    line-height: 2.1rem;
    svg {
      width: 1.1rem;
      margin-inline-end: 1.1rem;
    }

    &.inline {
      min-width: auto;
      background: transparent;
      box-shadow: none;
    }
  `;

  const [isModalShareOpen, setIsModalShareOpen] = useState(false);

  return (
    <>
      <Button
        type="default"
        icon={<ShareColorIcon />}
        className={cx(BtnShareCourseStyles, { inline })}
        onClick={() => setIsModalShareOpen(true)}
      >
        Share
      </Button>
      <ModalShareCourse
        open={isModalShareOpen}
        onCancel={() => setIsModalShareOpen(false)}
        title="Share This Course"
      />
    </>
  );
}

export default BtnShareCourse;
