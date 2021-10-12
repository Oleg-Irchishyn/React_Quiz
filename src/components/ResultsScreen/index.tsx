import React from 'react';
import styles from '../../styles/components/ResultsScreen.module.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getQuizResults, getQuizResultsScore } from '../../redux/selectors/appSelectors';
import { LowScore, MiddleScore, HighScore, TopScore } from '../';

const ResultsScreen: React.FC<MapStatePropsType & ownProps> = React.memo(
  ({ quizResults, quizResultsScore }) => {
    const lowScorePoints = Number(quizResultsScore) <= 30;
    const middleScorePoints = Number(quizResultsScore) <= 60;
    const highScorePoints = Number(quizResultsScore) <= 80;
    const topScorePoints = Number(quizResultsScore) <= 100;
    return (
      <div className={cn(styles.resultsScreen)}>
        <div className={cn(styles.resultsScreen__content)}>
          {lowScorePoints
            ? quizResults.map((result, index) => {
                const { title, points, imgUrl, text } = result;
                switch (points) {
                  case '0-30':
                    return (
                      <LowScore
                        key={`${index}_${title}`}
                        title={title}
                        points={points}
                        imgUrl={imgUrl}
                        text={text}
                      />
                    );
                }
              })
            : middleScorePoints
            ? quizResults.map((result, index) => {
                const { title, points, imgUrl, text } = result;
                switch (points) {
                  case '40-60':
                    return (
                      <MiddleScore
                        key={`${index}_${title}`}
                        title={title}
                        points={points}
                        imgUrl={imgUrl}
                        text={text}
                      />
                    );
                }
              })
            : highScorePoints
            ? quizResults.map((result, index) => {
                const { title, points, imgUrl, text } = result;
                switch (points) {
                  case '70-80':
                    return (
                      <HighScore
                        key={`${index}_${title}`}
                        title={title}
                        points={points}
                        imgUrl={imgUrl}
                        text={text}
                      />
                    );
                }
              })
            : topScorePoints
            ? quizResults.map((result, index) => {
                const { title, points, imgUrl, text } = result;
                switch (points) {
                  case '90-100':
                    return (
                      <TopScore
                        key={`${index}_${title}`}
                        title={title}
                        points={points}
                        imgUrl={imgUrl}
                        text={text}
                      />
                    );
                }
              })
            : null}
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
