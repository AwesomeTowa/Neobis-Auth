import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import s from './Form.module.scss';
import * as Yup from 'yup';
import { signin, reset } from '../features/auth-slice';
import Spinner from '../components/Spinner';
import { checkToken } from '../features/authorize-slice';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      dispatch(checkToken());
      navigate(`/users/me`);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Неправильный email адрес.')
          .required('Введите email.'),
        password: Yup.string()
          .min(8, 'Пароль должен содержать минимум 8 символов.')
          .required('Введите пароль.'),
      })}
      onSubmit={values => {
        const userData = JSON.stringify(values, null, 2);

        dispatch(signin(userData));
      }}
    >
      <Form className={s.form}>
        <MyTextInput
          label='Email address'
          id='email'
          name='email'
          type='email'
        />
        <MyTextInput
          label='Password'
          id='password'
          name='password'
          type='password'
        />
        <button type='submit'>Login</button>
      </Form>
    </Formik>
  );
};
