import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type quizQuestionType = {
  id: string | number;
  imgUrl: any;
  question: string;
  answers: Array<answerType>;
};

export type quizResults = {
  imgUrl: any;
  points: string;
  title: string;
  text: string;
};

export type answerType = {
  text: string | number;
  correct: boolean;
};
