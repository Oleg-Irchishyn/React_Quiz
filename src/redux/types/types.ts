export type quizQuestionType = {
  id: string | number;
  question: string;
  answers: Array<answerType>;
};

export type quizResults = {
  id: string | number;
  points: string;
  title: string;
  text: string;
};

type answerType = {
  text: string | number;
  correct: boolean;
};
