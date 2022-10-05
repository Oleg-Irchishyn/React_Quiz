import React from 'react';
import { mainAPI } from '../../../../api/api';
import { quizFormType, quizQuestionType, quizResults } from '../../../../redux/types/types';
import {
  actions,
  setQuizQustionsSuccess,
  sendQuizFormSuccess,
  setQuizResultsSuccess,
} from '../../appReducer';

jest.mock('../../../../api/api');

const mainAPIMock = mainAPI as jest.Mocked<typeof mainAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

describe(`Test appReducer's thunks`, () => {
  let questions: quizQuestionType[];
  let quizForm: quizFormType;
  let quizResults: quizResults[];

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
    quizResults = [
      {
        name: 'lowScore',
        imgUrl: './images/results-icons/low-score.png',
        points: '0-30',
        title: 'Casino Streamers? Who are these people?',
        text: 'You probably came to this page by accident. Or maybe you are just starting to get acquainted with the gambling and streaming enterprising world. Either way, you still have a lot to learn. Go to our website, read some helpful articles, and we guarantee – you will catch up fast.',
      },
      {
        name: 'middleScore',
        imgUrl: './images/results-icons/middle-score.png',
        points: '40-60',
        title: 'Newbie',
        text: 'It looks like you are just starting to get to know the streaming business, but you are already getting to grips with the key people and events. You have great potential and an apparent interest in gambling. Watch more casino streams, read our regular digest with the biggest online slot wins, and you will have all the chances to turn from a newcomer into a compulsive gambler with a huge fan base.',
      },
      {
        name: 'highScore',
        imgUrl: './images/results-icons/high-score.png',
        points: '70-80',
        title: 'Professional streamer!',
        text: 'You know your way around the gambling scene almost excellently. And you know not only about the highest wins but also what happens during live broadcasts by popular casino streamers. You can easily tell the difference between a fake streamer and a reliable one; a streamer who loves hype and a genuinely skillful gambler. You can make your way to the top of the gambling Olympus and become a professional streamer with a bit of effort.',
      },
      {
        name: 'topScore',
        imgUrl: './images/results-icons/top-score.png',
        points: '90-100',
        title: 'Rising Streaming Star',
        text: 'You know more about streamers than the popular casino streamers themselves do. You do not need to be told what is going on on the gambling and streaming scene. Because you are aware of everything: who, when, how much, under which circumstances, and in what slot win a lot of money or lose everything. We are sure that you are a rising star of the streaming and gambling scene and a future honorable competitor for Roshtein, Xposed, and TrainwrecksTV. Follow your dream and make crazy wins!',
      },
    ];
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

  test(`setQuizResultsSuccess thunk test`, async () => {
    mainAPIMock.getQuizResults.mockReturnValue(Promise.resolve(quizResults));
    const thunk = setQuizResultsSuccess();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setQuizResults(quizResults));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setIsLoaded(false));
    expect(quizResults.length).toBeGreaterThan(2);
  });
});
