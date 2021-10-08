import { quizFormType } from './../redux/types/types';
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
  getQuizForms: () => {
    return instance.get(`quizForms`).then((response) => {
      return response.data;
    });
  },
  sendQuizForm: (
    id: string | number,
    name: string | number,
    email: string | number,
    personalDataAccept: boolean,
    subscribe: boolean,
  ) => {
    return instance
      .post<quizFormType>(`quizForms`, { id, name, email, personalDataAccept, subscribe })
      .then((response) => {
        return response.data;
      });
  },
};
