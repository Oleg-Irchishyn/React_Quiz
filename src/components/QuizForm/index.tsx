import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/QuizForm.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { required, emailValidation } from '../../redux/utils/validators/';
import { FormAction, InjectedFormProps, reduxForm } from 'redux-form';
import { createCheckbox, createInput } from '../../components/common/FormControls';
import { AppStateType } from '../../redux/store';
import { getIsLoading, getQuizResultsScore } from '../../redux/selectors/appSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions, sendQuizFormSuccess } from '../../redux/reducers/appReducer';
import { quizFormType } from '../../redux/types/types';

const QuizForm: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({
    quizResultsScore,
    isLoading,
    sendQuizFormSuccess,
    handleSetVisibleFormSection,
    calcQuizResultsScore,
  }) => {
    React.useEffect(() => {
      calcQuizResultsScore();
    }, []);
    const onSubmitForm = (values: AddNewQuizFormValuesType, dispatch: (T: FormAction) => void) => {
      const newQuizFormObj = {
        id: uuidv4(),
        name: values.name,
        email: values.email,
        personalDataAccept: values.personalData,
        subscribe: values.subscribe,
        totalScore: quizResultsScore,
      };
      handleSetVisibleFormSection(false);
      sendQuizFormSuccess(newQuizFormObj);
    };

    return (
      <div className={cn(styles.quizForm__wrapper)}>
        <div className={cn(styles.quizForm)}>
          <div className={cn(styles.quizForm__caption)}>
            <h2>
              You have gained
              <span>{quizResultsScore && quizResultsScore > 0 ? quizResultsScore : 0}</span>points
            </h2>
            <p>
              Do you have an opprotunity to become a famous streamer? Find out your score right now!
            </p>
          </div>

          <div className={cn(styles.quizForm__form_section)}>
            <AddNewQuizFormRedux isLoading={isLoading} onSubmit={onSubmitForm} />
          </div>
        </div>
      </div>
    );
  },
);

const AddNewQuizForm: React.FC<InjectedFormProps<AddNewQuizFormValuesType, PropsType> & PropsType> =
  (props) => {
    const { isLoading, handleSubmit } = props;
    return (
      <form className={cn(styles.quizForm__content)} onSubmit={handleSubmit}>
        <div className={cn(styles.content__top)}>
          {createInput<AddNewPostFormValuesTypeKeys>(uuidv4(), 'Name', 'name', 'text', [required])}
          {createInput<AddNewPostFormValuesTypeKeys>(uuidv4(), 'Email*', 'email', 'text', [
            required,
            emailValidation,
          ])}
        </div>

        <div className={cn(styles.content__middle)}>
          {createCheckbox<AddNewPostFormValuesTypeKeys>(
            'personalData',
            'personalData',
            'checkbox',
            'I consent to the processing of my personal data',
            [required],
          )}

          {createCheckbox<AddNewPostFormValuesTypeKeys>(
            'subscribe',
            'subscribe',
            'checkbox',
            'Subscribe to news updates',
            [],
          )}
        </div>
        <div className={cn(styles.content__bottom)}>
          <button disabled={isLoading}>Submit</button>
        </div>
      </form>
    );
  };

const AddNewQuizFormRedux = reduxForm<AddNewQuizFormValuesType, PropsType>({
  form: 'addNewQuizForm',
})(AddNewQuizForm);

type PropsType = {
  isLoading: boolean;
};

export type AddNewQuizFormValuesType = {
  name: string | number;
  email: string | number;
  personalData: boolean;
  subscribe: boolean;
};

type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewQuizFormValuesType, string>;

const mapStateToProps = (state: AppStateType) => ({
  isLoading: getIsLoading(state),
  quizResultsScore: getQuizResultsScore(state),
});

type ownProps = {
  handleSetVisibleFormSection: (value: boolean) => void;
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  sendQuizFormSuccess: (obj: quizFormType) => void;
  calcQuizResultsScore: () => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    sendQuizFormSuccess,
    calcQuizResultsScore: actions.calcQuizResultsScore,
  }),
)(QuizForm);
