/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import SideLogo from '../components/SideLogo.jsx';
import {
  SignInContainer,
  SignInForm,
  Input,
  SignInButton,
  SwitchButton,
} from '../styles/signInPage.styles.js';
import { UserContext } from '../context/userContext.jsx';

export default function SignInPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('linkr_token');
    if (token) {
      navigate('/timeline');
    }
  }, []);

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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, form);
      localStorage.setItem('linkr_token', JSON.stringify(response.data.token));
      const {
        email,
        id,
        name,
        photo,
      } = jwtDecode(response.data.token);
      setUserData({
        email,
        id,
        name,
        photo,
      });
      setDisabled(false);
      return navigate('/timeline');
    } catch (error) {
      setDisabled(false);
      if (error?.response.status === 401) return alert(error.response.data.message);

      if (error?.response.status === 422) {
        return alert(error.response.data.message.join(' '));
      }

      if (error?.response.status === 404) return alert(error.response.data.message);
      console.error(error);
      return alert('There was an unexpected error!');
    }
  }
  return (
    <SignInContainer>
      <SideLogo />
      <SignInForm onSubmit={handleSubmit(submitForm)}>

        <Input
          type="text"
          placeholder="e-mail"
          disabled={disabled}
          {...register('email')}
        />
        <Input
          type="password"
          placeholder="password"
          disabled={disabled}
          {...register('password')}
        />
        <SignInButton disabled={disabled}>Log In</SignInButton>
        <SwitchButton disabled={disabled} onClick={() => navigate('/sign-up')} type="button">First time? Create an account!</SwitchButton>
      </SignInForm>
    </SignInContainer>
  );
}
