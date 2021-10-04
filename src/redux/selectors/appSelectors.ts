import { createSelector } from 'reselect';
import { AppStateType } from '../store';

const initializeApp = (state: AppStateType) => {
  return state.app.initialized;
};

export const getQuizQuestions = (state: AppStateType) => {
  return state.app.quizQuestions;
};

/*Selectors, created by reselect library*/

export const initializeAppSelector = createSelector(initializeApp, (initializations) => {
  return (initializations = true);
});
