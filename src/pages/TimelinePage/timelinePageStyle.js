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
  background-color: blue;
  margin-right: 25px;
`;
export const CreatePost = styled.div`
  width: 100%;
  height: 209px;
  background-color: ${colors.neutral};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 29px;
`;
export const Timeline = styled.div`

`;
/* PostContainer */
export const PostContainer = styled.div`
  width: 100%;
  height: 276px;
  background-color: ${colors.modal};
`;
