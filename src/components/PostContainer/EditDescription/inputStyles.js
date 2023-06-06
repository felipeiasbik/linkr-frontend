import styled from 'styled-components';
import colors from '../../../constants/colors.js';
import fonts from '../../../constants/fonts.js';

export const EditInput = styled.input`
  width: 490px;
  height: 44px;
  border-radius: 11px;
  padding: 12px;
  font-family:${fonts.main} ;
  border-radius: 6px;
  border: none;
  margin-bottom: 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  &::placeholder{
    color: ${colors.placeholder};
  }
`;
