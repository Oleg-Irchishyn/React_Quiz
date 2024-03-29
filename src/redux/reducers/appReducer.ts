import { quizQuestionType, quizResults, answerType, quizFormType } from './../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { AppStateType, InferActionsTypes, BaseThunkType } from './../store';
import { mainAPI } from '../../api/api';
import { FormAction } from 'redux-form';
const INITIALIZED_SUCCESS = 'quiz/app/INITIALIZED_SUCCESS';
const SET_QUIZ_QUESTIONS = 'quiz/app/SET_QUIZ_QUESTIONS';
const SET_QUIZ_RESULTS = 'quiz/app/SET_QUIZ_RESULTS';
const SET_QUIZ_ANSWERS = 'quiz/app/SET_QUIZ_ANSWERS';
const SET_QUIZ_FORMS = 'quiz/app/SET_QUIZ_FORMS';
const SET_IS_LOADED = 'quiz/app/SET_IS_LOADING';
const ADD_QUIZ_FORM = 'quiz/app/ADD_QUIZ_FORM';
const CALC_QUIZ_RESULTS_SCORE = 'quiz/app/CALC_QUIZ_RESULTS_SCORE';
const RESET_QUIZ_ANSWERS = 'quiz/app/RESET_QUIZ_ANSWERS';
const RESET_QUIZ_RESULTS_SCORE = 'quiz/app/RESET_QUIZ_RESULTS_SCORE';
const SHOW_RESULTS_SCREEN = 'quiz/app/SHOW_RESULTS_SCREEN';

let initialState = {
  initialized: false as boolean,
  isLoading: false as boolean,
  quizQuestions: [] as Array<quizQuestionType>,
  quizResults: [] as Array<quizResults>,
  quizAnswers: [] as Array<answerType>,
  quizForms: [] as Array<quizFormType>,
  quizResultsScore: undefined as number | undefined,
};

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    case SET_IS_LOADED: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_QUIZ_QUESTIONS: {
      return {
        ...state,
        isLoading: true,
        quizQuestions: action.questions,
      };
    }
    case SET_QUIZ_RESULTS: {
      return {
        ...state,
        isLoading: true,
        quizResults: action.results,
      };
    }
    case SET_QUIZ_FORMS: {
      return {
        ...state,
        isLoading: true,
        quizForms: action.forms,
      };
    }
    case SET_QUIZ_ANSWERS: {
      return {
        ...state,
        quizAnswers: [...state.quizAnswers, action.answer],
      };
    }
    case ADD_QUIZ_FORM: {
      return {
        ...state,
        isLoading: true,
        quizForms: [...state.quizForms, action.obj],
      };
    }
    case RESET_QUIZ_ANSWERS: {
      return {
        ...state,
        quizAnswers: [],
      };
    }
    case RESET_QUIZ_RESULTS_SCORE: {
      return {
        ...state,
        quizResultsScore: action.val,
      };
    }
    case CALC_QUIZ_RESULTS_SCORE: {
      const quizAnswersCorrectCount = state.quizAnswers.filter((item) => {
        return item.correct === true;
      });
      const calcResultsScore = Math.floor((Number(quizAnswersCorrectCount.length) / 100) * 1000);
      return {
        ...state,
        quizResultsScore: calcResultsScore,
      };
    }
    case SHOW_RESULTS_SCREEN: {
      const filterQuizResults = (score: number | undefined, results: Array<quizResults>) => {
        switch (true) {
          case Number(score) <= 30: {
            return results.filter((result) => result.points === '0-30');
          }
          case Number(score) <= 60: {
            return results.filter((result) => result.points === '40-60');
          }
          case Number(score) <= 80: {
            return results.filter((result) => result.points === '70-80');
          }
          case Number(score) <= 100: {
            return results.filter((result) => result.points === '90-100');
          }
          default:
            return results;
        }
      };
      return {
        ...state,
        quizResults: filterQuizResults(action.score, action.results),
      };
    }
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
  setQuizAnswers: (answer: answerType) => ({ type: SET_QUIZ_ANSWERS, answer } as const),
  setQuizForms: (forms: Array<quizFormType>) => ({ type: SET_QUIZ_FORMS, forms } as const),
  addQuizForm: (obj: quizFormType) => ({ type: ADD_QUIZ_FORM, obj } as const),
  resetQuizAnswers: () => ({ type: RESET_QUIZ_ANSWERS } as const),
  resetQuizResultsScore: (val: number) => ({ type: RESET_QUIZ_RESULTS_SCORE, val } as const),
  calcQuizResultsScore: () => ({ type: CALC_QUIZ_RESULTS_SCORE } as const),
  showResultsScreen: (score: number | undefined, results: Array<quizResults>) =>
    ({ type: SHOW_RESULTS_SCREEN, score, results } as const),
};

export const setQuizQustionsSuccess = (): ThunkType => async (dispatch) => {
  try {
    let data = await mainAPI.getQuizQuestions();
    dispatch(actions.setQuizQustions(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.setIsLoaded(false));
  }
};

export const setQuizResultsSuccess = (): ThunkType => async (dispatch) => {
  try {
    let data = await mainAPI.getQuizResults();
    dispatch(actions.setQuizResults(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.setIsLoaded(false));
  }
};

export const setQuizFormsSuccess = (): ThunkType => async (dispatch) => {
  try {
    let data = await mainAPI.getQuizForms();
    dispatch(actions.setQuizForms(data));
  } catch (err) {
    throw new Error(`Promise has not been resolved properly`);
  } finally {
    dispatch(actions.setIsLoaded(false));
  }
};

export const sendQuizFormSuccess =
  (obj: quizFormType): ThunkType =>
  async (dispatch) => {
    const { id, name, email, personalDataAccept, subscribe, totalScore } = obj;
    try {
      let data = await mainAPI.sendQuizForm(
        id,
        name,
        email,
        personalDataAccept,
        subscribe,
        totalScore,
      );
      dispatch(actions.addQuizForm(data));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(actions.setIsLoaded(false));
    }
  };

export const initializeApp = () => (dispatch: ThunkDispatchType) => {
  let promises = [
    dispatch(setQuizQustionsSuccess()),
    dispatch(setQuizResultsSuccess()),
    dispatch(setQuizFormsSuccess()),
  ];
  Promise.all([promises]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkDispatchType = ThunkDispatch<AppStateType, {}, ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export default appReducer;
