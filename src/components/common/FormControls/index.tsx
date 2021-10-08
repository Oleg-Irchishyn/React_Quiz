import React, { HTMLInputTypeAttribute, ReactNode } from 'react';
import styles from '../../../styles/components/FormControls.module.scss';
import {
  Field,
  WrappedFieldInputProps,
  WrappedFieldMetaProps,
  WrappedFieldProps,
} from 'redux-form';

import { FiledValidatorType } from '../../../redux/utils/validators';

type FormControlPropsType = {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  children: ReactNode;
};

const FormControl: React.FC<FormControlPropsType> = ({
  input,
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>{children}</div>
      {hasError && <span>"{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  id: string | number | undefined,
  placeholder: string | undefined,
  name: FormKeysType,
  type: HTMLInputTypeAttribute | undefined,
  component: React.FC<WrappedFieldProps>,
  valiadtors: Array<FiledValidatorType>,
  props = {},
  text = '',
) {
  return (
    <div>
      <Field
        id={id}
        placeholder={placeholder}
        name={name}
        type={type}
        component={component}
        validate={valiadtors}
        {...props}
      />
      {text}
    </div>
  );
}
