import { quizQuestionType, quizResults } from './../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { AppStateType, InferActionsTypes, BaseThunkType } from './../store';
import { mainAPI } from '../../api/api';
import { FormAction } from 'redux-form';
const INITIALIZED_SUCCESS = 'quiz/app/INITIALIZED_SUCCESS';
const SET_QUIZ_QUESTIONS = 'quiz/app/SET_QUIZ_QUESTIONS';
const SET_QUIZ_RESULTS = 'quiz/app/SET_QUIZ_RESULTS';
const SET_IS_LOADED = 'quiz/app/SET_IS_LOADING';

let initialState = {
  initialized: false as boolean,
  isLoading: false as boolean,
  quizQuestions: [] as Array<quizQuestionType>,
  quizResults: [] as Array<quizResults>,
};

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case SET_IS_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_QUIZ_QUESTIONS:
      return {
        ...state,
        isLoading: true,
        quizQuestions: action.questions,
      };
    case SET_QUIZ_RESULTS:
      return {
        ...state,
        isLoading: true,
        quizResults: action.results,
      };
    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),
  setIsLoaded: (payload: boolean) => ({ type: SET_IS_LOADED, payload } as const),
  setQuizQustions: (questions: Array<quizQuestionType>) =>
    ({ type: SET_QUIZ_QUESTIONS, questions } as const),
  setQuizResults: (results: Array<quizResults>) => ({ type: SET_QUIZ_RESULTS, results } as const),
};

export const setQuizQustionsSuccess = (): ThunkType => async (dispatch: ThunkDispatchType) => {
  try {
    let data = await mainAPI.getQuizQuestions();
    dispatch(actions.setQuizQustions(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.setIsLoaded(false));
  }
};

export const setQuizResultsSuccess = (): ThunkType => async (dispatch: ThunkDispatchType) => {
  try {
    let data = await mainAPI.getQuizResults();
    dispatch(actions.setQuizResults(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.setIsLoaded(false));
  }
};

export const initializeApp = () => (dispatch: ThunkDispatchType) => {
  let promises = [dispatch(setQuizQustionsSuccess()), dispatch(setQuizResultsSuccess())];
  Promise.all([promises]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkDispatchType = ThunkDispatch<AppStateType, {}, ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export default appReducer;