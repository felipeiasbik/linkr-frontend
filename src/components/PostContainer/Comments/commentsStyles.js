import styled from 'styled-components';
import fonts from '../../../constants/fonts';

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family:${fonts.main};
svg{
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 30px;
  color: #FFFFFF;
  cursor: pointer;
}
p{
  display: flex;
  justify-content: center;
  width: 70px;
  font-weight: 400;
  font-size: 11px;
  color: #FFFFFF;
}
`;
