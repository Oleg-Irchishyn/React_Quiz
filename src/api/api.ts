import { quizFormType, quizQuestionType, quizResults } from './../redux/types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `/`,
});

export const mainAPI = {
  getQuizQuestions: () => {
    return instance.get<quizQuestionType[]>(`quizQuestions`).then((response) => {
      return response.data;
    });
  },
  getQuizResults: () => {
    return instance.get<quizResults[]>(`quizResults`).then((response) => {
      return response.data;
    });
  },
  getQuizForms: () => {
    return instance.get<quizFormType[]>(`quizForms`).then((response) => {
      return response.data;
    });
  },
  sendQuizForm: (
    id: string | number,
    name: string | number,
    email: string | number,
    personalDataAccept: boolean,
    subscribe: boolean,
    totalScore: number | undefined,
  ) => {
    return instance
      .post<quizFormType>(`quizForms`, {
        id,
        name,
        email,
        personalDataAccept,
        subscribe,
        totalScore,
      })
      .then((response) => {
        return response.data;
      });
  },
};
