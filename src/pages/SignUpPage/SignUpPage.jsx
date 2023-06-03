/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  SignUpContainer,
  SignUpForm,
  Input,
  SignUpButton,
  SwitchButton,
} from './signUpPage.styles.js';
import SideLogo from '../../components/SideLogo/SideLogo.jsx';

export default function SignUpPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  async function submitForm(form) {
    setDisabled(true);
    const keys = Object.keys(form);

    for (const key of keys) {
      if (!form[key]) {
        alert(`The ${key} field is blank!`);
        return setDisabled(false);
      }
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, form);

      setDisabled(false);

      return navigate('/');
    } catch (error) {
      setDisabled(false);
      if (error?.response.status === 401) return alert(error.response.data.message);

      if (error?.response.status === 422) {
        return alert(error.response.data.message.join(' '));
      }

      return alert('There was an unexpected error!');
    }
  }
  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit(submitForm)}>

        <Input
          type="text"
          placeholder="e-mail"
          disabled={disabled}
          {...register('email')}
          data-test="email"
        />
        <Input
          type="password"
          placeholder="password"
          disabled={disabled}
          {...register('password')}
          data-test="password"
        />
        <Input
          type="text"
          placeholder="username"
          disabled={disabled}
          {...register('name')}
          data-test="username"
        />
        <Input
          type="text"
          placeholder="photo"
          disabled={disabled}
          {...register('photo')}
          data-test="picture-url"
        />
        <SignUpButton disabled={disabled} data-test="sign-up-btn">Sign Up</SignUpButton>
        <SwitchButton disabled={disabled} onClick={() => navigate('/')} type="button" data-test="login-link">Switch back to log in</SwitchButton>
      </SignUpForm>
    </SignUpContainer>
  );
}
