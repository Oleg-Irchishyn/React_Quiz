import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/QuizForm.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { required } from '../../redux/utils/validators/';
import { Field, FormAction, InjectedFormProps, reduxForm } from 'redux-form';
import { Input, createField } from '../../components/common/FormControls';
import { AppStateType } from '../../redux/store';
import { getIsLoading } from '../../redux/selectors/appSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { sendQuizFormSuccess } from '../../redux/reducers/appReducer';
import { quizFormType } from '../../redux/types/types';

const QuizForm: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ isLoading, sendQuizFormSuccess }) => {
    const onSubmitForm = (values: AddNewQuizFormValuesType, dispatch: (T: FormAction) => void) => {
      const newQuizFormObj = {
        id: uuidv4(),
        name: values.name,
        email: values.email,
        personalDataAccept: values.personalData,
        subscribe: values.subscribe,
      };
      sendQuizFormSuccess(newQuizFormObj);
    };

    return (
      <div className={cn(styles.quizForm)}>
        <div className={cn(styles.quizForm__caption)}>
          <h2>You have gained {0} points</h2>
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
          {createField<AddNewPostFormValuesTypeKeys>('name', 'name', Input, [required])}
          {createField<AddNewPostFormValuesTypeKeys>('email', 'email', Input, [required])}
          <div>
            <div className={cn(styles.content__middle)}>
              <Field
                name="personalData"
                id="personalData"
                component={Input}
                type="checkbox"
                required
              />
              <label htmlFor="personalData">I consent to the processing of my personal data</label>
              <Field name="subscribe" id="subscribe" component={Input} type="checkbox" required />
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
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  sendQuizFormSuccess: (obj: quizFormType) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    sendQuizFormSuccess,
  }),
)(QuizForm);
