import React from 'react';
import styles from '../../styles/components/ResultsScreen.module.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cn from 'classnames';
import { AppStateType } from '../../redux/store';
import { getQuizResults, getQuizResultsScore } from '../../redux/selectors/appSelectors';
import { ResultsCard } from '../';
import { quizResults } from '../../redux/types/types';
import { actions } from '../../redux/reducers/appReducer';

const ResultsScreen: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ quizResults, quizResultsScore, showResultsScreen, handleSetVisibleResultsSection }) => {
    React.useEffect(() => {
      showResultsScreen(quizResultsScore, quizResults);
    }, []);
    return (
      <div data-testid="results-screen" className={cn(styles.resultsScreen)}>
        <div className={cn(styles.resultsScreen__content)}>
          {quizResults.map((result, index) => {
            const { title, points, imgUrl, text } = result;
            return (
              <ResultsCard
                key={`${index}_${title}`}
                //@ts-ignore
                title={title}
                points={points}
                imgUrl={imgUrl}
                text={text}
                handleSetVisibleResultsSection={handleSetVisibleResultsSection}
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

type MapDispatchPropsType = {
  showResultsScreen: (score: number | undefined, results: Array<quizResults>) => void;
};

type ownProps = {
  imgUrl: any;
  points: string;
  title: string;
  text: string;
  handleSetVisibleResultsSection: (value: boolean) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    showResultsScreen: actions.showResultsScreen,
  }),
)(ResultsScreen);
