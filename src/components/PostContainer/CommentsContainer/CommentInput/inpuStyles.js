import styled from 'styled-components';
import colors from '../../../../constants/colors';

export const InputContainer = styled.div`
display: flex;
position: relative;
width: 100%;
margin-top: 15px;
img{
  width: 39px;
  height: 39px;
  object-fit: cover;
  border-radius: 50%;
}
form{
  width: 100%;
  margin-left: 14px;
  input{
  width:100%;
  height: 40px;
  padding: 10px 15px;
  background: ${colors.commentInput};
  border: none;
  border-radius: 8px;
  color: ${colors.comment};
  &::placeholder{
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${colors.commentFollowing};
  }
  &:focus{
    outline:none
  }
}
button{
  position: absolute;
  top: calc(50% - 7px);
  right:10px;
  border: none;
  cursor: pointer;
  background: ${colors.commentInput};
}
svg{
  font-size: 14px;
  color: ${colors.neutral};
}
svg:hover{
  color: ${colors.submitButton};
}
}
`;
