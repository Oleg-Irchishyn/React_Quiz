import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizForm } from '../../../';
import { renderTestApp } from '../../../../helpers/renderTestApp';
import { QuizNextArrow } from '..';
import { quizQuestionType } from '../../../../redux/types/types';

const handleSetVisibleSliderSection: (value: boolean) => void = jest.fn();

describe('Test Quiz Slider', () => {
  let result: quizQuestionType[];
  let currentSlide: number;

  beforeEach(() => {
    result = [
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

    currentSlide = 2;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`render quiz form section after clicking on Results button in the last slide`, () => {
    render(
      renderTestApp(
        [
          <QuizNextArrow
            currentSlide={currentSlide}
            quizQuestions={result}
            handleSetVisibleSliderSection={handleSetVisibleSliderSection}
          />,
          <QuizForm />,
        ],
        {
          initialRoute: '/',
        },
      ),
    );

    expect(screen.queryByText(/results/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('results-btn'));
    expect(screen.queryByTestId('quiz-form-caption')).toBeInTheDocument();
  });
});
