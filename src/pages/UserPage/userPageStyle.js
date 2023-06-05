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
