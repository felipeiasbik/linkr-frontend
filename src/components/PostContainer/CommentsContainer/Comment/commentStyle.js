import styled from 'styled-components';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

export const CommentCard = styled.div`
display: flex;
align-items: center;
min-height: 70px;
width: 100%;
border-bottom: 1px solid #353535;
font-family: ${fonts.main};
img{
  width: 39px;
  height: 39px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
}
`;

export const RightContainer = styled.div`
  margin: 0 10px;
p{
  color: ${colors.comment};
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}
`;

export const NameContainer = styled.div`
display: flex;
align-items: center;
span{
  color: ${colors.commentaryName};
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
}
p{
 color: ${colors.commentFollowing};
 margin: 0 5px;
}
`;
