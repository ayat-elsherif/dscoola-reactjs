import { css } from '@emotion/css';
import { useState } from 'react';
import StepsItem from './StepsItem';

function OwnSteps({ steps = [], currentStep, vertical, onChange }) {
  const StepsMapStyles = css`
    width: max-content;
    margin: 3rem 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: ${vertical ? 'column' : 'row'};
    gap: ${vertical ? '2rem' : '.5rem'};

    .sparetor {
      width: ${vertical ? '1px' : '13rem'};
      height: ${vertical ? '8rem' : '1px'};
      margin-top: ${vertical ? '0' : '-3rem'};
      background-color: rgba(0, 0, 0, 0.22);
    }
  `;

  const stepIdx = +currentStep - 1;
  // const [nextStep, setNextStep] = useState(currentStep);

  // const onChangeStep = () => {
  //   onChange(nextStep);
  // };

  return (
    <div className={StepsMapStyles}>
      {steps?.map((step, i, arr) => {
        const isLast = i === arr.length - 1;
        const isChecked = i < stepIdx;
        const isClickAble = stepIdx > i;
        return (
          <>
            <StepsItem
              icon={step?.icon}
              title={step?.title}
              isActive={i === stepIdx}
              isChecked={isChecked}
              isClickAble={isClickAble}
              onClick={() => {
                if (!isClickAble) return;
                onChange(i + 1);
              }}
            />

            {!isLast && <div className="sparetor"></div>}
          </>
        );
      })}
    </div>
  );
}

export default OwnSteps;
