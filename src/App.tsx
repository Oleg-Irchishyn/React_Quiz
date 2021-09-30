import React from 'react';
import styles from './styles/components/App.module.scss';
import cn from 'classnames';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { initializeAppSelector } from './redux/selectors/appSelectors';
import { Preloader, SliderExample } from './components/common';
import { AppStateType } from './redux/store';
import { initializeApp } from './redux/reducers/appReducer';

/* React Lazy example
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedProfile = withSuspense(ProfileContainer);
*/

const App: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ initializeApp, initialized }) => {
    React.useEffect(() => {
      initializeApp();
    }, []);

    if (!initialized) {
      return <Preloader />;
    }

    let sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className={styles.App}>
        <SliderExample />
        <Switch>
          <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          {/*<Route path="/profile/:userId?" render={() => <SuspendedProfile />} />*/}
        </Switch>
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

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter,
)(App);
