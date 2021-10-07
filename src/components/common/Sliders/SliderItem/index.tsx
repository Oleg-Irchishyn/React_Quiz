import React from 'react';
import styles from './../../../../styles/components/Sliders.module.scss';
import cn from 'classnames';
import { answerType } from '../../../../redux/types/types';
import { AppStateType } from '../../../../redux/store';
import { getQuizAnswers } from '../../../../redux/selectors/appSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../../../redux/reducers/appReducer';

const QuizSliderItem: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ question, answers, imgUrl, quizAnswers, setQuizAnswers }) => {
    const [selectedItem, setSelectedItem] = React.useState(false);
    const handleQuizAnswer = (elem: answerType) => {
      if (quizAnswers.includes(elem)) {
        return false;
      } else {
        setQuizAnswers(elem);
        setSelectedItem(true);
      }
    };
    return (
      <div className={cn(styles.quizSlider__item)}>
        <div className={cn(styles.item__img)}>
          <img src={imgUrl} />
        </div>
        <div className={cn(styles.item__question)}>
          <p>{question}</p>
        </div>
        <div
          className={cn(styles.item__answers, {
            [styles.selected]: selectedItem,
          })}>
          {answers.map((elem, index) => {
            const { text, correct } = elem;
            return (
              <div
                className={cn(styles.answer, {
                  [styles.correct]: selectedItem && correct,
                  [styles.wrong]: selectedItem && !correct,
                })}
                key={`${index}_${text}`}
                onClick={() => handleQuizAnswer(elem)}>
                <p>
                  <i>{index + 1}</i>
                  <span>{text}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

type ownProps = {
  question: string;
  answers: Array<answerType>;
  imgUrl: any;
};

const mapStateToProps = (state: AppStateType) => ({
  quizAnswers: getQuizAnswers(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setQuizAnswers: (answer: answerType) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setQuizAnswers: actions.setQuizAnswers,
  }),
)(QuizSliderItem);
