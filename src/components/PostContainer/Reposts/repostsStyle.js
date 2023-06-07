import styled from 'styled-components';
import ReactModal from 'react-modal';
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
export const RepostNow = styled(ReactModal)`
position: absolute;
top: calc(50% - 131px);
left: calc(50% - 283px);
background: #333333;
width: 597px;
height: 262px;
padding: 10px;
border-radius: 50px;
display: flex;
flex-direction: column;
align-items: center;
font-family: ${fonts.main};
z-index: 5;
p{
  width: 350px;
  margin: 10px 0;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #FFFFFF;
}
`;
export const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 330px;
margin: 40px 0;
button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 134px;
  height: 37px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
}
`;
export const BackButton = styled.button`
background: #FFFFFF;
color: #1877F2;
`;
export const ConfirmButton = styled.button`
background: #1877F2;
color: #ffffff;
`;
