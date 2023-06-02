import styled from 'styled-components';
import colors from '../constants/colors.js';

export const MainContainer = styled.div`
  padding-top: ${({ logged }) => (logged ? '72px' : '')};
  background-color: ${colors.main};
  height: 100vh;

  @media (max-width: 768px){
    padding-top: ${({ logged }) => (logged ? '152px' : '')};
  }
`;
