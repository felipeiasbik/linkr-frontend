import ReactModal from 'react-modal';
import styled from 'styled-components';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';

export const IconsContainer = styled.div`
display: ${({ userLogged, owner, repostUserId }) => (!repostUserId && userLogged === owner ? 'flex' : 'none')};
position:absolute;
top:10px;
right: 10px;
svg{
  margin:5px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
}
svg:hover{
  color: ${colors.submitButton};
}
`;

export const DeleteModal = styled(ReactModal)`
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
p{
  width: 350px;
  margin: 10px 0;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #FFFFFF;
}
  @media (max-width: 768px){
  left: calc(0%);
  border-radius: 0px;
  padding: 20px;
  width: 100%;
  height: auto;
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
