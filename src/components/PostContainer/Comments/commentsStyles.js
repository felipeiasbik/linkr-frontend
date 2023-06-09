import styled from 'styled-components';
import fonts from '../../../constants/fonts';

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family:${fonts.main};
svg{
  margin-top: 10px;
  margin-bottom: 2px;
  font-size: 21px;
  color: #FFFFFF;
  cursor: pointer;
  @media (max-width: 768px){
    font-size: 18px;
  }
}
p{
  display: flex;
  justify-content: center;
  width: 70px;
  font-weight: 400;
  font-size: 11px;
  color: #FFFFFF;
  @media (max-width: 768px){
    font-size: 9px;
  }
}
`;
