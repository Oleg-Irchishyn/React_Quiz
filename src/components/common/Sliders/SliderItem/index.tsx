import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import styles from './../../../../styles/components/Sliders.module.scss';
import cn from 'classnames';
import { answerType } from '../../../../redux/types/types';

const QuizSliderItem: React.FC<ownProps> = React.memo(({ question, answers, imgUrl }) => {
  return (
    <div className={cn(styles.quizSlider__item)}>
      <div className={cn(styles.item__img)}>
        <img src={imgUrl} />
      </div>
      <div className={cn(styles.item__question)}>
        <p>{question}</p>
      </div>
      <div className={cn(styles.item__answers)}>
        {answers.map((elem, index) => {
          const { text, correct } = elem;
          return (
            <div className={cn(styles.answers)} key={`${index}_${text}`}>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

type ownProps = {
  question: string;
  answers: Array<answerType>;
  imgUrl: any;
};

export default QuizSliderItem;
