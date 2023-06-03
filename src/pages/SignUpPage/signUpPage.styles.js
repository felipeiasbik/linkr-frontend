import styled, { keyframes } from 'styled-components';
import fonts from '../../constants/fonts.js';
import colors from '../../constants/colors.js';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const SignUpContainer = styled.div`
  color: ${colors.neutral};
  display: flex;
  height: 100vh;
  @media (max-width: 768px){
    flex-direction: column;
  }
`;

export const SignUpForm = styled.form`
  animation: ${fadeIn} .5s ease-in;
  font-family:${fonts.main} ;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.main};
  width: 40%;
  height: 100%;
  margin-left: 60%;
  @media (max-width: 768px){
    height: 70%;
    width: 100%;
    margin-left: 0;
    margin-top: 30vh;
  }
  button{
    color: ${colors.neutral};
    border: none;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  padding: 12px;
  font-family:${fonts.main} ;
  width: 80%;
  height: 65px;
  border-radius: 6px;
  border: none;
  margin-bottom: 14px;
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
  &::placeholder{
    color: ${colors.placeholder};
  }
  @media (max-width: 768px){
    width: 85%;
    height: 55px;
  }
`;

export const SignUpButton = styled.button`
  font-family:${fonts.main};
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
  width: 80%;
  height: 65px;
  background-color: ${({ disabled }) => (disabled ? 'lightgray' : colors.submitButton)};
  border-radius: 6px;
  margin-top: 14px;
  @media (max-width: 768px){
    width: 85%;
    height: 55px;
  }
`;

export const SwitchButton = styled.button`
  font-family:${fonts.main};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  width: 80%;
  height: 65px;
  background-color: ${colors.main};
  text-decoration: underline;
  @media (max-width: 768px){
    width: 85%;
    height: 55px;
  }
`;
