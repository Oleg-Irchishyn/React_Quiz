import React from 'react';
import styles from '../../styles/components/ResultsScreen.module.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getQuizResults, getQuizResultsScore } from '../../redux/selectors/appSelectors';
import { LowScore } from '../';
import { quizResults } from '../../redux/types/types';

const ResultsScreen: React.FC<MapStatePropsType & ownProps> = React.memo(
  ({ quizResults, quizResultsScore }) => {
    const lowScorePoints = quizResultsScore && quizResultsScore <= 30;
    return (
      <div className={cn(styles.resultsScreen)}>
        <div className={cn(styles.resultsScreen__content)}>
          {quizResults.map((result, index) => {
            const { title, points, imgUrl, text } = result;
            return (
              <LowScore
                key={`${index}_${title}`}
                title={title}
                points={points}
                imgUrl={imgUrl}
                text={text}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  quizResults: getQuizResults(state),
  quizResultsScore: getQuizResultsScore(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type ownProps = {
  imgUrl: any;
  points: string;
  title: string;
  text: string;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, {}, ownProps, AppStateType>(mapStateToProps, {}),
)(ResultsScreen);
