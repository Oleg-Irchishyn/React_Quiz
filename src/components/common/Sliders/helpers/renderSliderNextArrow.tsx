import React from 'react';
import { quizQuestionType } from '../../../../redux/types/types';
import styles from '../../../../styles/components/Sliders.module.scss';
import cn from 'classnames';

export const renderSliderNextArrow = (
  clickCallBack: any,
  handleVisibilityCb: (val: boolean) => void,
  firstNum: number,
  secondNum: Array<quizQuestionType>,
) => {
  if (firstNum === secondNum.length - 1) {
    return (
      <div
        data-testid="results-btn"
        className={cn(styles.quizSlider__next_arrow)}
        onClick={() => handleVisibilityCb(false)}>
        Results
      </div>
    );
  }
  return (
    <div className={cn(styles.quizSlider__next_arrow)} onClick={clickCallBack}>
      Forward
    </div>
  );
};
