import { quizQuestionType, quizResults } from './../redux/types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `/`,
});

export const mainAPI = {
  getQuizQuestions: () => {
    return instance.get(`quizQuestions`).then((response) => {
      return response.data;
    });
  },
  getQuizResults: () => {
    return instance.get(`quizResults`).then((response) => {
      return response.data;
    });
  },
};
