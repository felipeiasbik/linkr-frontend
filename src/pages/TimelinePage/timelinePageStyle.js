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
export const Title = styled.h2`
  width: 100%;
  font-family: ${fonts.secondary};
  color: ${colors.neutral};
  font-size: 43px;
  margin-bottom: 43px;
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
export const CreatePost = styled.div`
  width: 100%;
  height: 209px;
  background-color: ${colors.neutral};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 29px;
  display: flex;
`;
export const Timeline = styled.div`
`;
export const UserImage = styled.div`
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 45px;

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
`;
export const FormArea = styled.div`
`;
