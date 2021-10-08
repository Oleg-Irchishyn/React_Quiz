import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/QuizForm.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { required } from '../../redux/utils/validators/';
import { Field, FormAction, InjectedFormProps, reduxForm } from 'redux-form';
import { Input, createField } from '../../components/common/FormControls';
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
      };
      sendQuizFormSuccess(newQuizFormObj);
      handleSetVisibleFormSection(false);
    };

    return (
      <div className={cn(styles.quizForm)}>
        <div className={cn(styles.quizForm__caption)}>
          <h2>
            You have gained {quizResultsScore && quizResultsScore > 0 ? quizResultsScore : 0} points
          </h2>
          <p>
            Do you have an opprotunity to become a famous streamer? Find out your score right now!
          </p>
        </div>

        <div className={cn(styles.quizForm__form_section)}>
          <AddNewQuizFormRedux isLoading={isLoading} onSubmit={onSubmitForm} />
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
          {createField<AddNewPostFormValuesTypeKeys>(uuidv4(), 'name', 'name', 'text', Input, [
            required,
          ])}
          {createField<AddNewPostFormValuesTypeKeys>(uuidv4(), 'email', 'email', 'text', Input, [
            required,
          ])}
          <div>
            <div className={cn(styles.content__middle)}>
              {createField<AddNewPostFormValuesTypeKeys>(
                'personalData',
                undefined,
                'personalData',
                'checkbox',
                Input,
                [required],
              )}
              <label htmlFor="personalData">I consent to the processing of my personal data</label>

              {createField<AddNewPostFormValuesTypeKeys>(
                'subscribe',
                undefined,
                'subscribe',
                'checkbox',
                Input,
                [],
              )}
              <label htmlFor="subscribe">Subscribe to news updates</label>
            </div>
          </div>
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
