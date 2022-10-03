import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StartScreen } from '../../../components';
import { QuizSlider } from '../../common';
import { renderTestApp } from '../../../helpers/renderTestApp';

const handleSetVisibleSection: (value: boolean) => void = jest.fn();

describe('Test App Component', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`render quiz slider section after clicking on start button in the StartScreen component`, () => {
    render(
      renderTestApp(
        [<StartScreen handleSetVisibleSection={handleSetVisibleSection} />, <QuizSlider />],
        {
          initialRoute: '/',
        },
      ),
    );
    userEvent.click(screen.getByTestId('start-screen-btn'));
    expect(screen.queryByTestId('quiz-slider-title')).toBeInTheDocument();
  });
});
