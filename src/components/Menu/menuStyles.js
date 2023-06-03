import styled from 'styled-components';
import {
  Box, styled as muiStyled,
} from '@mui/material';
import colors from '../../constants/colors.js';
import fonts from '../../constants/fonts.js';

export const ModalBox = muiStyled(Box)(() => ({
  opacity: 1,
  width: '180px',
  borderRadius: '0  0  0 20px',
  padding: '10px',
  backgroundColor: colors.modal,
  position: 'absolute',
  right: 0,
  top: '72px',
  height: '47px',
  transition: 'all .5s',
  textAlign: 'center',
}));

export const LogoutButton = styled.button`
  background-color: transparent;
  color: ${colors.neutral};
  font-family: ${fonts.main};
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.05em;
  border: none;
`;
