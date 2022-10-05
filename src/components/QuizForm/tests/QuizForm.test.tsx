import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderTestApp } from '../../../helpers/renderTestApp';
import { QuizForm, ResultsScreen } from '../../';

describe('Test Quiz Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`check if text inputs give correct information`, () => {
    render(
      renderTestApp([<QuizForm />], {
        initialRoute: '/',
      }),
    );

    const inputName = screen.getByPlaceholderText(/please enter your name/i);
    const inputEmail = screen.getByPlaceholderText(/email/i);

    userEvent.type(inputName, 'super Oleg');
    userEvent.type(inputEmail, '3333');

    expect(inputName).toContainHTML('super Oleg');
    expect(inputEmail).toContainHTML('3333');
  });
  test(`check if checkboxes work correctly`, () => {
    render(
      renderTestApp([<QuizForm />], {
        initialRoute: '/',
      }),
    );

    const personalDataCheckbox = screen.getByTestId('personalData');
    const subscribeCheckbox = screen.getByTestId('subscribe');

    userEvent.click(personalDataCheckbox);
    userEvent.click(subscribeCheckbox);

    expect(personalDataCheckbox).toBeChecked();
    expect(subscribeCheckbox).toBeChecked();

    userEvent.click(personalDataCheckbox);
    expect(personalDataCheckbox).not.toBeChecked();
  });
  test(`check if a submit button is redirecting to the ResultsScreen page after correct submitting`, () => {
    render(
      renderTestApp([<QuizForm />, <ResultsScreen />], {
        initialRoute: '/',
      }),
    );
    const submitBtn = screen.getByTestId('subscribe-btn');
    userEvent.click(submitBtn);
    expect(screen.getByTestId('results-screen')).toBeInTheDocument();
  });
});
