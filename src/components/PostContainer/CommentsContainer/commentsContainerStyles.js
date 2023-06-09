import styled, { keyframes } from 'styled-components';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const increaseHeight = keyframes`
  from{
    height: 0px;
  }
  to{
    height: 100%;
  }
`;

export const Container = styled.div`
  animation: ${increaseHeight} .3s ease-in;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 250px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    margin-top:20px;
  }
  &::-webkit-scrollbar-track {
    background: #1E1E1E;        
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.placeholder};    
    border-radius: 20px;
  }
  z-index: 1;
  @media (max-width: 611px){
    width: 100%;
  }
`;

export const BackContainer = styled.div`
  display: ${(props) => (props.showComments ? 'flex' : 'none')};
  position: relative;
  width: 610px;
  height: 300px;
  font-family: ${fonts.main};
  @media (max-width: 611px){
    width: 100%;
  }
`;

export const CommentsBox = styled.div`
  animation: ${increaseHeight} .3s ease;
  display: flex;
  flex-direction: column;
  width: 610px;
  height: 316px;
  position: absolute;
  top: -16px;
  padding: 20px;
  background: ${colors.commentBackground};
  border-radius: 0 0 16px 16px;
  @media (max-width: 611px){
    width: 100%;
  }
`;

export const EmptyMessage = styled.p`
  width: 200px;
  margin: auto;
  color: ${colors.neutral};
  font-size: 20px;
  font-weight: 400;
`;
