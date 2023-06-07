import styled, { keyframes } from 'styled-components';
import { TfiReload } from 'react-icons/tfi';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

const roll = keyframes`
  to {
    transform: rotateZ(0deg);
  }
  from{
    transform: rotateZ(360deg);
  }
`;

const increaseHeight = keyframes`
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1); /* Aumenta a altura para 120% */
  }
`;
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 912px;
  margin: auto;
`;
export const Title = styled.h2`
  width: 100%;
  font-family: ${fonts.secondary};
  color: ${colors.neutral};
  font-size: 43px;
  margin-bottom: 43px;
  margin-top: 30px;
  @media (max-width: 768px){ 
  padding-left: 20px;
  }
`;
export const Content = styled.div`
  display: flex;
`;
export const PostsArea = styled.div`
  width: 611px;
  margin-right: ${({ margin }) => margin && '25px'};

  @media (max-width: 768px){
    width: 100%;
  }
`;

export const Timeline = styled.div`
  h3 {
    width: 100%;
    font-family: ${fonts.secondary};
    color: ${colors.neutral};
    font-size: 43px;
    margin-bottom: 43px;
    display: flex;
    justify-content: center;
  }
`;

export const NewPosts = styled.button`
  animation: ${increaseHeight} 0.3s ease-in-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 611px;
  height: 61px;
  background: ${colors.submitButton};
  color: ${colors.neutral};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: none;
  margin-bottom: 20px;
  font-family: ${fonts.main};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  transition: all .3s;
  :hover{
    background: ${colors.neutral};
    color: ${colors.submitButton};
    svg{
      transform: rotateZ(360deg);
    }
  }
  :active {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 1);
  }
  @media (max-width: 768px){
    width: 100%;
    align-self: center;
  }
`;

export const ReloadIcon = styled(TfiReload)`
  animation: ${roll} 1s ease infinite;;
  margin-left: 15px;
  stroke-width: 1.2;
  transition: transform 0.3s ease;
`;
