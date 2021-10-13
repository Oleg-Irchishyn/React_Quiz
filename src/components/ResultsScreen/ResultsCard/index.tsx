import React from 'react';
import styles from '../../../styles/components/ResultsScreen.module.scss';
import cn from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/store';
import { actions, setQuizResultsSuccess } from '../../../redux/reducers/appReducer';

const ResultsCard: React.FC<MapDispatchPropsType & ownProps> = React.memo(
  ({
    imgUrl,
    points,
    title,
    text,
    handleSetVisibleResultsSection,
    resetQuizResultsScore,
    resetQuizAnswers,
    setQuizResultsSuccess,
  }) => {
    const retryTest = () => {
      handleSetVisibleResultsSection(false);
      resetQuizResultsScore(0);
      resetQuizAnswers();
      setQuizResultsSuccess();
    };
    return (
      <div className={cn(styles.content__inner)}>
        <h2 className={cn(styles.content__title)}>{title}</h2>
        <p className={cn(styles.content__score)}>{`${points} points`}</p>
        <div className={cn(styles.content__body)}>
          <div className={cn(styles.body__img)}>
            <img src={imgUrl} />
          </div>
          <div className={cn(styles.body__text)}>
            <p>{text}</p>
          </div>
          <button className={cn(styles.content__btn)} onClick={retryTest}>
            Retry
          </button>
        </div>
      </div>
    );
  },
);

type ownProps = {
  imgUrl: any;
  points: string;
  title: string;
  text: string;
  handleSetVisibleResultsSection: (value: boolean) => void;
};

type MapDispatchPropsType = {
  resetQuizResultsScore: (val: number) => void;
  resetQuizAnswers: () => void;
  setQuizResultsSuccess: () => void;
};

export default compose<React.ComponentType>(
  connect<{}, MapDispatchPropsType, ownProps, AppStateType>(null, {
    resetQuizResultsScore: actions.resetQuizResultsScore,
    resetQuizAnswers: actions.resetQuizAnswers,
    setQuizResultsSuccess,
  }),
)(ResultsCard);
