import React from 'react';
import { answerType, quizFormType, quizQuestionType, quizResults } from '../../../types/types';
import appReducer, { actions, initialStateType } from '../../appReducer';

describe(`app reducer's actions test`, () => {
  let state: initialStateType;
  let quizResults: Array<quizResults>;

  beforeEach(() => {
    state = {
      initialized: false as boolean,
      isLoading: false as boolean,
      quizQuestions: [] as Array<quizQuestionType>,
      quizResults: [] as Array<quizResults>,
      quizAnswers: [] as Array<answerType>,
      quizForms: [] as Array<quizFormType>,
      quizResultsScore: undefined as number | undefined,
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

  test(`showResultsScreen action test should return a middleScore result screen`, () => {
    let action = actions.showResultsScreen(50, quizResults);
    let newState = appReducer(state, action);
    expect(newState.quizResults.length).toBe(1);
    expect(newState.quizResults[0].name).toBe('middleScore');
  });

  test(`showResultsScreen action test should return a lowScore result screen`, () => {
    let action = actions.showResultsScreen(0, quizResults);
    let newState = appReducer(state, action);
    expect(newState.quizResults.length).toBe(1);
    expect(newState.quizResults[0].name).toBe('lowScore');
  });
});
