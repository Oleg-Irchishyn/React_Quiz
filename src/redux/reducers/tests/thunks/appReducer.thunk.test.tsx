import React from 'react';
import { mainAPI } from '../../../../api/api';
import { quizFormType, quizQuestionType } from '../../../../redux/types/types';
import { actions, setQuizQustionsSuccess, sendQuizFormSuccess } from '../../appReducer';

jest.mock('../../../../api/api');

const mainAPIMock = mainAPI as jest.Mocked<typeof mainAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

describe(`Test appReducer's thunks`, () => {
  let questions: quizQuestionType[];
  let quizForm: quizFormType;

  beforeEach(() => {
    questions = [
      {
        id: 0,
        imgUrl: './images/slider-icons/1.png',
        question:
          'Up to date, there are many casino streamers,but the only person who knows slot games better than many others and is called “a casino philosopher.” Who is this experienced gambler?',
        answers: [
          {
            text: 'Trainwreks',
            correct: false,
          },
          {
            text: 'Roshtein',
            correct: true,
          },
          {
            text: 'm0_e',
            correct: false,
          },
        ],
      },
      {
        id: 1,
        imgUrl: './images/slider-icons/2.png',
        question:
          'Many people who are watching casino streams are aware of Roshtein. But a few of them know his real name. So, what is his real name?',
        answers: [
          {
            text: 'Ismael Swartz',
            correct: true,
          },
          {
            text: 'Ras Muhamad',
            correct: false,
          },
          {
            text: 'Liam Cooper',
            correct: false,
          },
        ],
      },
      {
        id: 2,
        imgUrl: './images/slider-icons/3.png',
        question:
          'One of the most influential streamers on Twitch had started broadcasting Slots but finished this hobby because of gambling addiction. Who is this influential streamer?',
        answers: [
          {
            text: 'Xposed',
            correct: false,
          },
          {
            text: 'AyeZee',
            correct: false,
          },
          {
            text: 'xQc',
            correct: true,
          },
        ],
      },
    ];
    quizForm = {
      id: 69,
      name: 'dimych',
      email: 'dimych@test.com',
      personalDataAccept: false,
      subscribe: true,
      totalScore: 100,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`setQuizQuestionsSuccess thunk test`, async () => {
    mainAPIMock.getQuizQuestions.mockReturnValue(Promise.resolve(questions));
    const thunk = setQuizQustionsSuccess();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setQuizQustions(questions));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setIsLoaded(false));
  });

  test(`sendQuizFormSuccess  thunk test`, async () => {
    mainAPIMock.sendQuizForm.mockReturnValue(Promise.resolve(quizForm));
    const thunk = sendQuizFormSuccess(quizForm);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.addQuizForm(quizForm));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setIsLoaded(false));
  });
});
