export type quizQuestionType = {
  id: string | number;
  imgUrl: HTMLImageElement | string | File;
  question: string;
  answers: Array<answerType>;
};

export type quizResults = {
  id: string | number;
  imgUrl: HTMLImageElement | string | File;
  points: string;
  title: string;
  text: string;
};

export type answerType = {
  text: string | number;
  correct: boolean;
};
