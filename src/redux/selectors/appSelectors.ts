import { createSelector } from 'reselect';
import { AppStateType } from '../store';

const initializeApp = (state: AppStateType) => {
  return state.app.initialized;
};

export const getQuizQuestions = (state: AppStateType) => {
  return state.app.quizQuestions;
};

export const getQuizAnswers = (state: AppStateType) => {
  return state.app.quizAnswers;
};

export const getIsLoading = (state: AppStateType) => {
  return state.app.isLoading;
};

/*Selectors, created by reselect library*/

export const initializeAppSelector = createSelector(initializeApp, (initializations) => {
  return (initializations = true);
});
