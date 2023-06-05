import styled from 'styled-components';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export const CreatePost = styled.div`
  width: 100%;
  height: 209px;
  background-color: ${colors.neutral};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 29px;
  display: flex;
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
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  color: #707070;
  position: relative;

  h3 {
    font-family: ${fonts.main};
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
    margin: 20px 0;
    color: #707070;
  }

  input, textarea{
    font-family: ${fonts.main};
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: #EFEFEF;
    padding: 10px;
    color: #707070;
  }

  input {
    margin-bottom: 5px;
    height: 30px;
  }

  textarea {
    height: 66px;
    resize: none;
  }

  button {
    width: 112px;
    height: 31px;
    color: ${colors.neutral};
    background-color: ${colors.submitButton};
    position: absolute;
    border-radius: 5px;
    outline: none;
    border: none;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
`;
