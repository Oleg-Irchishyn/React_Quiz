export type quizQuestionType = {
  id: string | number;
  imgUrl: any;
  question: string;
  answers: Array<answerType>;
};

export type quizResults = {
  name: string;
  imgUrl: any;
  points: string;
  title: string;
  text: string;
};

export type answerType = {
  text: string | number;
  correct: boolean;
};

export type quizFormType = {
  id: string | number;
  name: string | number;
  email: string | number;
  personalDataAccept: boolean;
  subscribe: boolean;
  totalScore: number | undefined;
};
