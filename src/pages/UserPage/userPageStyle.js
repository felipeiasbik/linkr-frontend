import styled from 'styled-components';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 912px;
  margin: auto;
`;
export const Title = styled.div`
  width: 100%;
  font-family: ${fonts.secondary};
  color: ${colors.neutral};
  font-size: 43px;
  margin-bottom: 25px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img{
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
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

export const FollowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 112px;
  height: 31px;
  font-family: ${fonts.main};
  border: none;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  background: ${({ following }) => (following ? colors.neutral : colors.submitButton)};
  color: ${({ following }) => (following ? colors.submitButton : colors.neutral)};
  border-radius: 5px;
  transition: all .3s;
  :hover{
    background: ${({ following }) => (following ? colors.submitButton : colors.neutral)};
    color: ${({ following }) => (following ? colors.neutral : colors.submitButton)};
  }
  :active {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 1);
  }
`;
