import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles/components/App.module.scss';
import cn from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { initializeAppSelector } from './redux/selectors/appSelectors';
import { Preloader } from './components/common';
import { AppStateType } from './redux/store';
import { initializeApp } from './redux/reducers/appReducer';
import { StartScreen } from './components/';
import { withSuspense } from './hoc/WithSuspense';

const QuizSlider = React.lazy(() => import('./components/common/Sliders/'));
const SuspendedQuizSlider = withSuspense(QuizSlider);

const App: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ initializeApp, initialized }) => {
    React.useEffect(() => {
      initializeApp();
    }, []);

    const [visibleStartSection, setVisibleStartSection] = React.useState<boolean>(true);
    const [visibleSliderSection, setVisibleSliderSection] = React.useState<boolean>(false);

    const handleSetVisibleSection = (value: boolean): void => {
      setVisibleStartSection(value);
      setVisibleSliderSection(true);
    };

    const handleSetVisibleSliderSection = (value: boolean): void => {
      setVisibleSliderSection(value);
    };

    if (!initialized) {
      return <Preloader />;
    }

    return (
      <div className={styles.App}>
        {visibleStartSection && <StartScreen handleSetVisibleSection={handleSetVisibleSection} />}
        {visibleSliderSection && (
          <SuspendedQuizSlider handleSetVisibleSliderSection={handleSetVisibleSliderSection} />
        )}
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  initialized: initializeAppSelector(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
};

type ownProps = {
  handleSetVisibleSection: (value: boolean) => void;
  handleSetVisibleSliderSection: (value: boolean) => void;
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter,
)(App);
